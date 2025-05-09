import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import AnalyticsChart from "@/components/AnalyticsChart";
import ProjectCard from "@/components/ProjectCard";
import FaceDetection from "@/components/FaceDetection";
import OpenAIGenerator from "@/components/OpenAIGenerator";
import WebSocketChat from "@/components/WebSocketChat";
import NewProjectModal from "@/components/NewProjectModal";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Project, DashboardStats } from "@/types";

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = useMobile();
  const { toast } = useToast();

  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ['/api/stats'],
  });

  // Fetch projects
  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNewProject = () => {
    setModalOpen(true);
  };

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "You have 3 unread notifications.",
    });
  };

  useEffect(() => {
    if (mobileMenuOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen, isMobile]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for desktop */}
      <Sidebar mobileMenuOpen={mobileMenuOpen} toggleMenu={toggleMenu} />

      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-white dark:bg-gray-900 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8">
            <svg viewBox="0 0 100 100" className="text-primary w-full h-full" fill="currentColor">
              <path d="M50 10 C70 10, 90 30, 90 50 C90 70, 70 90, 50 90 C30 90, 10 70, 10 50 C10 30, 30 10, 50 10 Z M35 40 C35 35, 40 35, 40 40 M60 40 C60 35, 65 35, 65 40 M30 70 C40 80, 60 80, 70 70"></path>
            </svg>
          </div>
          <span className="text-lg font-semibold">WebsiteUpdater</span>
        </div>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-600"
          onClick={toggleMenu}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:ml-64 flex-1 overflow-y-auto pt-16 md:pt-0">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 shadow">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <div className="flex items-center space-x-4">
                <Button onClick={handleNewProject}>
                  <svg className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  New Project
                </Button>
                <div className="ml-3 relative">
                  <button
                    type="button"
                    className="bg-white dark:bg-gray-800 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleNotifications}
                  >
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-800"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main dashboard content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Dashboard stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            <StatCard 
              title="Total Views" 
              value={statsLoading ? "Loading..." : stats?.views.toString() || "0"}
              icon="eye"
              trend={statsLoading ? 0 : stats?.viewsTrend || 0}
              trendLabel="vs last month"
              color="indigo"
            />
            <StatCard 
              title="Projects" 
              value={statsLoading ? "Loading..." : stats?.projects.toString() || "0"}
              icon="folder"
              trend={statsLoading ? 0 : stats?.projectsTrend || 0}
              trendLabel="since last week"
              color="green"
            />
            <StatCard 
              title="Avg. Time on Site" 
              value={statsLoading ? "Loading..." : stats?.timeOnSite || "0s"}
              icon="clock"
              trend={statsLoading ? 0 : stats?.timeOnSiteTrend || 0}
              trendLabel="vs last month"
              color="yellow"
            />
            <StatCard 
              title="Total Users" 
              value={statsLoading ? "Loading..." : stats?.users.toString() || "0"}
              icon="users"
              trend={statsLoading ? 0 : stats?.usersTrend || 0}
              trendLabel="vs last month"
              color="purple"
            />
          </div>

          {/* Projects and Analytics section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <AnalyticsChart className="lg:col-span-2" />
            
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Recent Projects</h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {projectsLoading ? (
                  <div className="p-6 text-center text-gray-500">Loading projects...</div>
                ) : projects && projects.length > 0 ? (
                  projects.slice(0, 3).map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">No projects found</div>
                )}

                <div className="p-6">
                  <Button variant="link" className="w-full">
                    View all projects
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Face detection demo */}
          <FaceDetection className="mb-8" />

          {/* API Integration & WebSocket Demo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <OpenAIGenerator />
            <WebSocketChat />
          </div>
        </main>
      </div>

      {/* New Project Modal */}
      <NewProjectModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
