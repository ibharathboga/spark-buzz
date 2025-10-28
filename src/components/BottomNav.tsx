import { Home, Search, Bell, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from './ui/badge';

export const BottomNav = () => {
  const { user } = useAuth();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Bell, label: 'Notifications', path: '/notifications', badge: 3 },
    { icon: User, label: 'Profile', path: `/profile/${user?.id}` },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`
            }
          >
            <item.icon className="w-6 h-6" />
            {item.badge && (
              <Badge
                variant="destructive"
                className="absolute top-2 right-1/4 h-5 w-5 p-0 flex items-center justify-center text-xs"
              >
                {item.badge}
              </Badge>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
