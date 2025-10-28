import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, UserPlus, Share2 } from 'lucide-react';
import { mockNotifications } from '@/services/mockData';
import { Notification } from '@/types';
import { formatDistanceToNow } from 'date-fns';

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
  const icons = {
    like: <Heart className="w-5 h-5 text-red-500 fill-current" />,
    comment: <MessageCircle className="w-5 h-5 text-primary" />,
    follow: <UserPlus className="w-5 h-5 text-primary" />,
    share: <Share2 className="w-5 h-5 text-green-500" />,
  };
  return icons[type];
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <Layout>
      <div className="border-b border-border sticky top-0 bg-background z-10">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Notifications</h1>
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </div>
      </div>

      <div className="pb-20 md:pb-0">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => markAsRead(notification.id)}
            className={`border-b border-border p-4 hover:bg-muted/30 transition-colors cursor-pointer ${
              !notification.read ? 'bg-primary/5' : ''
            }`}
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <NotificationIcon type={notification.type} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {notification.fromUser.displayName[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-bold">{notification.fromUser.displayName}</span>{' '}
                      <span className="text-muted-foreground">{notification.content}</span>
                    </p>
                    {notification.post && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {notification.post.content}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No notifications yet
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Notifications;
