import { TrendingUp } from 'lucide-react';
import { Card } from './ui/card';

const trendingTopics = [
  { tag: '#ReactJS', posts: '12.5K posts' },
  { tag: '#WebDev', posts: '8.3K posts' },
  { tag: '#TypeScript', posts: '6.7K posts' },
  { tag: '#AI', posts: '15.2K posts' },
  { tag: '#StartupLife', posts: '4.1K posts' },
];

const whoToFollow = [
  { name: 'Sarah Johnson', username: 'sarah_codes', bio: 'Frontend Developer' },
  { name: 'Alex Chen', username: 'alex_dev', bio: 'Full Stack Engineer' },
  { name: 'Emma Davis', username: 'emma_design', bio: 'UX Designer' },
];

export const TrendingPanel = () => {
  return (
    <div className="p-4 space-y-4">
      {/* Trending Topics */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold">Trending</h2>
        </div>
        <div className="space-y-4">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="hover-overlay cursor-pointer p-2 rounded-lg">
              <p className="font-semibold text-foreground">{topic.tag}</p>
              <p className="text-sm text-muted-foreground">{topic.posts}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Who to Follow */}
      <Card className="p-4">
        <h2 className="text-lg font-bold mb-4">Who to follow</h2>
        <div className="space-y-4">
          {whoToFollow.map((user, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold flex-shrink-0">
                {user.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{user.name}</p>
                <p className="text-sm text-muted-foreground truncate">@{user.username}</p>
                <p className="text-xs text-muted-foreground mt-1">{user.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
