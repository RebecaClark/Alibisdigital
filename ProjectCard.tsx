import { Project } from "@/types";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const statusColor = {
    active: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
    "in-progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
    planning: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    completed: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  };

  return (
    <div className={cn("p-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-medium text-gray-900 dark:text-white">{project.name}</h4>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Last updated {project.lastUpdated}
          </p>
        </div>
        <div className="flex-shrink-0">
          <Badge variant="outline" className={cn(statusColor[project.status as keyof typeof statusColor])}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace("-", " ")}
          </Badge>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex -space-x-2">
          {project.team.map((member, idx) => (
            <img
              key={idx}
              className="h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800"
              src={member.avatar}
              alt={member.name}
            />
          ))}
        </div>
        <Link href={`/projects/${project.id}`}>
          <Button variant="link" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            View project
          </Button>
        </Link>
      </div>
    </div>
  );
}
