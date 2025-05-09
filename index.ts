// Project related types
export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  type: string;
  lastUpdated: string;
  team: TeamMember[];
}

export interface TeamMember {
  id: number;
  name: string;
  avatar: string;
  role: string;
}

// Dashboard statistics
export interface DashboardStats {
  views: number;
  viewsTrend: number;
  projects: number;
  projectsTrend: number;
  timeOnSite: string;
  timeOnSiteTrend: number;
  users: number;
  usersTrend: number;
}

// Analytics data
export interface AnalyticsData {
  date: string;
  views: number;
  visitors: number;
}

// OpenAI Content Generation
export interface ContentGenerationRequest {
  prompt: string;
  model: string;
}

export interface ContentGenerationResponse {
  content: string;
  model: string;
  processingTime: number;
}

// Face detection
export interface FaceDetectionResult {
  faceDetected: boolean;
  confidence: number;
  landmarks: number;
  processingTime: number;
}

// WebSocket message
export interface WebSocketMessage {
  sender: string;
  message: string;
  timestamp: string;
}
