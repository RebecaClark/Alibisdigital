import { cn } from "@/lib/utils";
import { 
  Eye, 
  FolderOpen, 
  Clock, 
  Users,
  LucideIcon,
  TrendingUp
} from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  icon: "eye" | "folder" | "clock" | "users";
  trend: number;
  trendLabel: string;
  color: "indigo" | "green" | "yellow" | "purple";
  className?: string;
};

export default function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  trendLabel,
  color,
  className 
}: StatCardProps) {
  
  const iconMap: Record<string, LucideIcon> = {
    eye: Eye,
    folder: FolderOpen,
    clock: Clock,
    users: Users
  };

  const Icon = iconMap[icon];

  const colorMap: Record<string, string> = {
    indigo: "bg-indigo-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500"
  };
  
  const bgColor = colorMap[color];

  return (
    <div className={cn("bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg", className)}>
      <div className="p-5">
        <div className="flex items-center">
          <div className={cn("flex-shrink-0 rounded-md p-3", bgColor)}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-medium text-gray-900 dark:text-white">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-green-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {trend > 0 ? `+${trend}${trend % 1 === 0 ? '' : '%'}` : `${trend}${trend % 1 === 0 ? '' : '%'}`}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{trendLabel}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
