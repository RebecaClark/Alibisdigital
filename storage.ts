import { db } from "@db";
import { 
  projects, 
  users, 
  projectMembers,
  statistics,
  contentGenerations,
  faceDetections,
  InsertProject,
  Project
} from "@shared/schema";
import { eq, desc, and, sql, gte } from "drizzle-orm";

export const storage = {
  // User methods
  async getUsers() {
    return db.query.users.findMany({
      orderBy: desc(users.createdAt)
    });
  },
  
  async getUserById(id: number) {
    return db.query.users.findFirst({
      where: eq(users.id, id)
    });
  },
  
  async getUserByUsername(username: string) {
    return db.query.users.findFirst({
      where: eq(users.username, username)
    });
  },
  
  // Project methods
  async getProjects() {
    const projectsData = await db.query.projects.findMany({
      orderBy: desc(projects.updatedAt),
      with: {
        members: {
          with: {
            user: true
          }
        }
      }
    });
    
    // Transform the data to match the expected format
    return projectsData.map(project => {
      const team = project.members.map(member => ({
        id: member.user.id,
        name: member.user.fullName || member.user.username,
        avatar: member.user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        role: member.role
      }));
      
      return {
        id: project.id,
        name: project.name,
        description: project.description || "",
        status: project.status,
        type: project.type,
        lastUpdated: getTimeAgo(project.updatedAt),
        team
      };
    });
  },
  
  async getProject(id: number) {
    const project = await db.query.projects.findFirst({
      where: eq(projects.id, id),
      with: {
        members: {
          with: {
            user: true
          }
        }
      }
    });
    
    if (!project) return null;
    
    const team = project.members.map(member => ({
      id: member.user.id,
      name: member.user.fullName || member.user.username,
      avatar: member.user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      role: member.role
    }));
    
    return {
      id: project.id,
      name: project.name,
      description: project.description || "",
      status: project.status,
      type: project.type,
      lastUpdated: getTimeAgo(project.updatedAt),
      team
    };
  },
  
  async createProject(data: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(data).returning();
    return newProject;
  },
  
  // Dashboard statistics
  async getDashboardStats() {
    // Get the latest statistics record
    const latestStats = await db.query.statistics.findFirst({
      orderBy: desc(statistics.date)
    });
    
    // Get project count
    const projectCount = await db.select({ count: sql<number>`count(*)` })
      .from(projects);
    
    // Get previous month statistics for comparison
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const previousStats = await db.query.statistics.findFirst({
      where: gte(statistics.date, oneMonthAgo),
      orderBy: statistics.date
    });
    
    // Calculate trends
    const viewsTrend = calculateTrend(
      latestStats?.views || 0, 
      previousStats?.views || 0
    );
    
    const projectsTrend = 2; // Hardcoded for demo
    
    const timeOnSiteTrend = calculateTrend(
      latestStats?.averageTimeOnSite || 0, 
      previousStats?.averageTimeOnSite || 0
    );
    
    const usersTrend = calculateTrend(
      latestStats?.totalUsers || 0, 
      previousStats?.totalUsers || 0
    );
    
    // Format time on site
    const timeOnSite = formatTimeOnSite(latestStats?.averageTimeOnSite || 0);
    
    return {
      views: latestStats?.views || 12457,
      viewsTrend: viewsTrend,
      projects: projectCount[0].count,
      projectsTrend: projectsTrend,
      timeOnSite: timeOnSite,
      timeOnSiteTrend: timeOnSiteTrend,
      users: latestStats?.totalUsers || 2342,
      usersTrend: usersTrend
    };
  },
  
  // Analytics data
  async getAnalytics(timeFrame: string) {
    // Parse the time frame
    const days = timeFrame === '7d' ? 7 : timeFrame === '30d' ? 30 : 90;
    
    // Calculate the date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const rawData = await db.query.statistics.findMany({
      where: gte(statistics.date, startDate),
      orderBy: statistics.date
    });
    
    // Transform and aggregate the data
    return rawData.map(record => ({
      date: formatDate(record.date),
      views: record.views,
      visitors: record.visitors
    }));
  }
};

// Helper functions
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  
  if (weeks > 0) {
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (days > 0) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return 'Just now';
  }
}

function calculateTrend(current: number, previous: number): number {
  if (previous === 0) return 0;
  return Number(((current - previous) / previous * 100).toFixed(1));
}

function formatTimeOnSite(seconds: number): string {
  if (seconds === 0) return '0s';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }
  
  return `${minutes}m ${remainingSeconds}s`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
