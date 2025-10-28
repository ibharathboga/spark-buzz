import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { PostCard } from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { mockUsers, mockPosts } from '@/services/mockData';
import { format } from 'date-fns';

const Profile = () => {
  const { userId } = useParams();
  const user = mockUsers.find((u) => u.id === userId);
  const userPosts = mockPosts.filter((p) => p.authorId === userId);

  if (!user) {
    return (
      <Layout>
        <div className="p-8 text-center">User not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <div className="border-b border-border sticky top-0 bg-background z-10">
        <div className="p-4">
          <h1 className="text-xl font-bold">{user.displayName}</h1>
          <p className="text-sm text-muted-foreground">{user.postsCount} posts</p>
        </div>
      </div>

      {/* Profile Info */}
      <div className="border-b border-border">
        {/* Cover (placeholder) */}
        <div className="h-48 bg-gradient-to-r from-primary/20 to-accent/20"></div>

        {/* Avatar & Info */}
        <div className="px-4 pb-4">
          <div className="flex justify-between items-start -mt-16 mb-4">
            <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-bold border-4 border-background">
              {user.displayName[0].toUpperCase()}
            </div>
            <Button className="mt-16 rounded-full">Follow</Button>
          </div>

          <div className="space-y-3">
            <div>
              <h2 className="text-2xl font-bold">{user.displayName}</h2>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>

            {user.bio && <p className="text-foreground">{user.bio}</p>}

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Joined {format(new Date(user.createdAt), 'MMMM yyyy')}</span>
            </div>

            <div className="flex gap-4 text-sm">
              <span>
                <strong className="text-foreground">{user.followingCount}</strong>{' '}
                <span className="text-muted-foreground">Following</span>
              </span>
              <span>
                <strong className="text-foreground">{user.followersCount}</strong>{' '}
                <span className="text-muted-foreground">Followers</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="pb-20 md:pb-0">
        {userPosts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No posts yet</div>
        ) : (
          userPosts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </Layout>
  );
};

export default Profile;
