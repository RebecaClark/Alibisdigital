import { useLocation, Link } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Home, 
  FolderOpen, 
  FileEdit, 
  FileText, 
  Settings,
  GitBranchPlus
} from "lucide-react";

type SidebarProps = {
  mobileMenuOpen: boolean;
  toggleMenu: () => void;
};

export default function Sidebar({ mobileMenuOpen, toggleMenu }: SidebarProps) {
  const [location] = useLocation();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Projects", href: "/projects", icon: FolderOpen },
    { name: "Funnel", href: "/funnel", icon: GitBranchPlus },
    { name: "Edit Content", href: "/edit-content", icon: FileEdit },
    { name: "Templates", href: "/templates", icon: FileText },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 z-10 bg-white dark:bg-gray-900 border-r">
        <div className="flex-1 flex flex-col min-h-0 pt-5">
          <div className="flex items-center justify-center h-16 flex-shrink-0 px-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect x="15" y="15" width="70" height="70" stroke="currentColor" strokeWidth="5" fill="none" rx="10" ry="10" />
                  <line x1="30" y1="35" x2="55" y2="35" stroke="currentColor" strokeWidth="5" />
                  <line x1="30" y1="50" x2="55" y2="50" stroke="currentColor" strokeWidth="5" />
                  <line x1="30" y1="65" x2="45" y2="65" stroke="currentColor" strokeWidth="5" />
                  <path d="M60,55 L70,70 L85,45" stroke="#00c853" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-lg font-semibold">Álibis Digital</span>
            </div>
          </div>
          <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 space-y-1">
              {navItems.map((item) => {
                const isActive = location === item.href;
                const Icon = item.icon;
                
                return (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    )}
                  >
                    <Icon className={cn(
                      "mr-3 h-5 w-5",
                      isActive ? "" : "text-gray-500 dark:text-gray-400"
                    )} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
        <div className="flex-shrink-0 flex border-t p-4">
          <Link href="/profile" className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <img 
                  className="inline-block h-9 w-9 rounded-full" 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Profile" 
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Tom Cook</p>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">Admin</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 flex z-40">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleMenu}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-900">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleMenu}
              >
                <span className="sr-only">Close sidebar</span>
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <rect x="15" y="15" width="70" height="70" stroke="currentColor" strokeWidth="5" fill="none" rx="10" ry="10" />
                      <line x1="30" y1="35" x2="55" y2="35" stroke="currentColor" strokeWidth="5" />
                      <line x1="30" y1="50" x2="55" y2="50" stroke="currentColor" strokeWidth="5" />
                      <line x1="30" y1="65" x2="45" y2="65" stroke="currentColor" strokeWidth="5" />
                      <path d="M60,55 L70,70 L85,45" stroke="#00c853" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-lg font-semibold">Álibis Digital</span>
                </div>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navItems.map((item) => {
                  const isActive = location === item.href;
                  const Icon = item.icon;
                  
                  return (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      className={cn(
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md",
                        isActive 
                          ? "bg-primary text-primary-foreground" 
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      )}
                      onClick={toggleMenu}
                    >
                      <Icon className={cn(
                        "mr-4 h-6 w-6",
                        isActive ? "" : "text-gray-500 dark:text-gray-400"
                      )} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
              <Link href="/profile" className="flex-shrink-0 group block" onClick={toggleMenu}>
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Profile"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-base font-medium text-gray-700 dark:text-gray-300">Tom Cook</p>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">Admin</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
        </div>
      )}
    </>
  );
}
