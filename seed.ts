import { db } from "./index";
import { 
  users, 
  projects, 
  projectMembers,
  statistics
} from "@shared/schema";
import { eq } from "drizzle-orm";

async function seed() {
  try {
    console.log("Starting database seed...");

    // Check if any users already exist to avoid duplicates
    const existingUsers = await db.query.users.findMany();
    
    if (existingUsers.length === 0) {
      console.log("Seeding users...");
      
      // Seed users
      const usersData = [
        {
          username: "tom.cook",
          password: "$2a$10$8Ux0OzyaLCIHKnK7ZaOxQ.R5XKj0kcVoJ9S4Yhq99Rz9m0JsQIDWO", // hashed password
          fullName: "Tom Cook",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          role: "admin"
        },
        {
          username: "emily.johnson",
          password: "$2a$10$8Ux0OzyaLCIHKnK7ZaOxQ.R5XKj0kcVoJ9S4Yhq99Rz9m0JsQIDWO",
          fullName: "Emily Johnson",
          avatar: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          role: "designer"
        },
        {
          username: "michael.wilson",
          password: "$2a$10$8Ux0OzyaLCIHKnK7ZaOxQ.R5XKj0kcVoJ9S4Yhq99Rz9m0JsQIDWO",
          fullName: "Michael Wilson",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
          role: "developer"
        },
        {
          username: "sarah.miller",
          password: "$2a$10$8Ux0OzyaLCIHKnK7ZaOxQ.R5XKj0kcVoJ9S4Yhq99Rz9m0JsQIDWO",
          fullName: "Sarah Miller",
          avatar: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          role: "content"
        }
      ];
      
      const insertedUsers = await db.insert(users).values(usersData).returning({ id: users.id });
      console.log(`Inserted ${insertedUsers.length} users`);
    } else {
      console.log(`Skipping users seed: ${existingUsers.length} users already exist`);
    }

    // Check if any projects already exist
    const existingProjects = await db.query.projects.findMany();
    
    if (existingProjects.length === 0) {
      console.log("Seeding projects...");
      
      // Seed projects
      const projectsData = [
        {
          name: "Company Website Redesign",
          description: "Refreshing the corporate website with new branding and improved user experience",
          type: "website",
          status: "active"
        },
        {
          name: "E-commerce Platform",
          description: "Building an online store for retail products with payment integration",
          type: "ecommerce",
          status: "in-progress"
        },
        {
          name: "Mobile App Development",
          description: "Creating a companion mobile app for our existing web service",
          type: "other",
          status: "planning"
        }
      ];
      
      const insertedProjects = await db.insert(projects).values(projectsData).returning({ id: projects.id });
      console.log(`Inserted ${insertedProjects.length} projects`);
      
      // Get all users for assigning to projects
      const allUsers = await db.query.users.findMany();
      
      // Seed project members
      const projectMembersData = [];
      
      // Project 1: Company Website Redesign - All members
      for (const user of allUsers) {
        projectMembersData.push({
          projectId: insertedProjects[0].id,
          userId: user.id,
          role: user.role
        });
      }
      
      // Project 2: E-commerce Platform - First two members
      projectMembersData.push({
        projectId: insertedProjects[1].id,
        userId: allUsers[0].id,
        role: allUsers[0].role
      });
      
      projectMembersData.push({
        projectId: insertedProjects[1].id,
        userId: allUsers[1].id,
        role: allUsers[1].role
      });
      
      // Project 3: Mobile App Development - First member only
      projectMembersData.push({
        projectId: insertedProjects[2].id,
        userId: allUsers[0].id,
        role: allUsers[0].role
      });
      
      const insertedProjectMembers = await db.insert(projectMembers).values(projectMembersData).returning();
      console.log(`Inserted ${insertedProjectMembers.length} project members`);
    } else {
      console.log(`Skipping projects seed: ${existingProjects.length} projects already exist`);
    }

    // Check if statistics exist
    const existingStatistics = await db.query.statistics.findMany();
    
    if (existingStatistics.length === 0) {
      console.log("Seeding statistics...");
      
      // Seed statistics for the past month (30 days)
      const statisticsData = [];
      const now = new Date();
      
      // Base stats
      const baseStats = {
        views: 12457,
        visitors: 8200,
        averageTimeOnSite: 204, // 3m 24s in seconds
        totalUsers: 2342
      };
      
      // Add slightly random variations for each day
      for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        // Add some random variation each day
        const randomFactor = 0.9 + Math.random() * 0.2; // Between 0.9 and 1.1
        
        statisticsData.push({
          views: Math.floor(baseStats.views * (1 + (30 - i) * 0.01) * randomFactor),
          visitors: Math.floor(baseStats.visitors * (1 + (30 - i) * 0.01) * randomFactor),
          averageTimeOnSite: Math.floor(baseStats.averageTimeOnSite * (1 + (30 - i) * 0.005) * randomFactor),
          totalUsers: Math.floor(baseStats.totalUsers * (1 + (30 - i) * 0.008) * randomFactor),
          date
        });
      }
      
      const insertedStatistics = await db.insert(statistics).values(statisticsData).returning({ id: statistics.id });
      console.log(`Inserted ${insertedStatistics.length} statistic records`);
    } else {
      console.log(`Skipping statistics seed: ${existingStatistics.length} statistic records already exist`);
    }

    console.log("Database seed completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
