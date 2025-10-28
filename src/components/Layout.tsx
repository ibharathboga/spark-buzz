import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { TrendingPanel } from './TrendingPanel';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden md:block w-64 sticky top-0 h-screen border-r border-border">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen border-r border-border">
          {children}
        </main>

        {/* Trending Panel - Hidden on tablet and mobile */}
        <aside className="hidden lg:block w-80 sticky top-0 h-screen">
          <TrendingPanel />
        </aside>
      </div>

      {/* Bottom Navigation - Visible on mobile only */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
};
