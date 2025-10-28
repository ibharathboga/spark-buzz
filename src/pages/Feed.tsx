import { Layout } from '@/components/Layout';
import { PostCard } from '@/components/PostCard';
import { useState, useEffect } from 'react';
import { Post } from '@/types';
import { postService } from '@/services/postService';
import { feedService } from '@/services/feedService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

const Feed = () => {
  const [forYouPosts, setForYouPosts] = useState<Post[]>([]);
  const [followingPosts, setFollowingPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('forYou');

  useEffect(() => {
    loadFeeds();
  }, []);

  const loadFeeds = async () => {
    setLoading(true);
    try {
      const [forYou, following] = await Promise.all([
        postService.getAllPosts(),
        feedService.getPersonalizedFeed(),
      ]);
      setForYouPosts(forYou);
      setFollowingPosts(following);
    } catch (error) {
      console.error('Failed to load feeds:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="border-b border-border sticky top-0 bg-background z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full h-auto p-0 bg-transparent rounded-none border-b-0">
            <TabsTrigger 
              value="forYou" 
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-14"
            >
              For You
            </TabsTrigger>
            <TabsTrigger 
              value="following" 
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-14"
            >
              Following
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="pb-20 md:pb-0">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {activeTab === 'forYou' && (
              <div>
                {forYouPosts.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No posts yet
                  </div>
                ) : (
                  forYouPosts.map((post) => (
                    <PostCard key={post.id} post={post} onUpdate={loadFeeds} />
                  ))
                )}
              </div>
            )}
            {activeTab === 'following' && (
              <div>
                {followingPosts.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    Follow users to see their posts here
                  </div>
                ) : (
                  followingPosts.map((post) => (
                    <PostCard key={post.id} post={post} onUpdate={loadFeeds} />
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Feed;
