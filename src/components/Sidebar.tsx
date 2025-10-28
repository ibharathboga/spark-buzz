import { Home, Search, Bell, User, LogOut, Edit } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from './ui/badge';

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Bell, label: 'Notifications', path: '/notifications', badge: 3 },
    { icon: User, label: 'Profile', path: `/profile/${user?.id}` },
  ];

  return (
    <div className="flex flex-col h-full p-4">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Microblog</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-full transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'hover:bg-muted text-foreground'
              }`
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="text-lg">{item.label}</span>
            {item.badge && (
              <Badge variant="destructive" className="ml-auto">
                {item.badge}
              </Badge>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Post Button */}
      <Button
        onClick={() => navigate('/create-post')}
        className="w-full mb-4 rounded-full py-6 text-lg font-bold"
      >
        <Edit className="w-5 h-5 mr-2" />
        Post
      </Button>

      {/* User Menu */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-muted cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
            {user?.displayName?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{user?.displayName}</p>
            <p className="text-sm text-muted-foreground truncate">@{user?.username}</p>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full mt-2 justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};
