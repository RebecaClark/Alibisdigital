import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart } from 'recharts';
import { useQuery } from '@tanstack/react-query';

type AnalyticsChartProps = {
  className?: string;
};

type DataPoint = {
  date: string;
  views: number;
  visitors: number;
};

type TimeFrame = '7d' | '30d' | '90d';

export default function AnalyticsChart({ className }: AnalyticsChartProps) {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('30d');
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  const { data, isLoading } = useQuery<DataPoint[]>({
    queryKey: ['/api/analytics', timeFrame],
  });

  if (isLoading) {
    return (
      <Card className={cn("bg-white dark:bg-gray-800 shadow rounded-lg", className)}>
        <CardHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Website Analytics</CardTitle>
            <div className="flex space-x-3">
              <Select disabled>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Loading..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-6 py-5">
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Loading analytics data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Placeholder data if API doesn't return anything
  const chartData = data || [
    { date: 'May 1', views: 120, visitors: 80 },
    { date: 'May 5', views: 150, visitors: 100 },
    { date: 'May 10', views: 180, visitors: 120 },
    { date: 'May 15', views: 250, visitors: 160 },
    { date: 'May 20', views: 280, visitors: 190 },
    { date: 'May 25', views: 320, visitors: 210 },
    { date: 'May 30', views: 350, visitors: 230 },
  ];

  return (
    <Card className={cn("bg-white dark:bg-gray-800 shadow rounded-lg", className)}>
      <CardHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Website Analytics</CardTitle>
          <div className="flex space-x-3">
            <Select value={chartType} onValueChange={(value) => setChartType(value as 'line' | 'bar')}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Chart Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="bar">Bar Chart</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeFrame} onValueChange={(value) => setTimeFrame(value as TimeFrame)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 py-5">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="visitors" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            ) : (
              <BarChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#8884d8" />
                <Bar dataKey="visitors" fill="#82ca9d" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
