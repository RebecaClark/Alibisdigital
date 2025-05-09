import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { generateContent } from "./services/openai";
import { handleWebSocketMessage } from "./services/websocket";
import { insertProjectSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);
  
  // Create WebSocket server
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  // Handle WebSocket connections
  wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');
    
    // Send welcome message
    ws.send(JSON.stringify({ 
      message: 'Welcome to the real-time updates channel!' 
    }));
    
    // Handle incoming messages
    ws.on('message', (data) => {
      handleWebSocketMessage(wss, ws, data);
    });
    
    // Handle disconnection
    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });
  
  // API Routes
  const apiRouter = express.Router();
  
  // Stats endpoint
  apiRouter.get('/stats', async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ message: 'Failed to fetch dashboard statistics' });
    }
  });
  
  // Analytics endpoint
  apiRouter.get('/analytics', async (req, res) => {
    try {
      const timeFrame = req.query.timeFrame as string || '30d';
      const analytics = await storage.getAnalytics(timeFrame);
      res.json(analytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      res.status(500).json({ message: 'Failed to fetch analytics data' });
    }
  });
  
  // Projects endpoints
  apiRouter.get('/projects', async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ message: 'Failed to fetch projects' });
    }
  });
  
  apiRouter.post('/projects', async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const newProject = await storage.createProject(validatedData);
      
      // Notify all connected clients about the new project
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: 'project_created',
            message: `New project created: ${newProject.name}`,
            project: newProject
          }));
        }
      });
      
      res.status(201).json(newProject);
    } catch (error: any) {
      console.error('Error creating project:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: fromZodError(error).message });
      }
      
      res.status(500).json({ message: 'Failed to create project' });
    }
  });
  
  apiRouter.get('/projects/:id', async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: 'Invalid project ID' });
      }
      
      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      res.json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ message: 'Failed to fetch project' });
    }
  });
  
  // OpenAI content generation endpoint
  apiRouter.post('/openai/generate', async (req, res) => {
    try {
      const schema = z.object({
        prompt: z.string().min(5, "Prompt must be at least 5 characters"),
        model: z.string().default("gpt-4o"),
      });
      
      const validatedData = schema.parse(req.body);
      const result = await generateContent(validatedData.prompt, validatedData.model);
      
      res.json({
        content: result.content,
        model: result.model,
        processingTime: result.processingTime
      });
    } catch (error: any) {
      console.error('Error generating content:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: fromZodError(error).message });
      }
      
      res.status(500).json({ message: 'Failed to generate content' });
    }
  });
  
  // Health check endpoint
  apiRouter.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });
  
  // Register API routes
  app.use('/api', apiRouter);

  return httpServer;
}
