import { Layout } from '@/components/Layout';
import { PostCard } from '@/components/PostCard';
import { mockPosts } from '@/services/mockData';
import { useState } from 'react';
import { Post } from '@/types';

const Feed = () => {
  const [posts] = useState<Post[]>(mockPosts);

  return (
    <Layout>
      <div className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <h1 className="text-xl font-bold p-4">Home</h1>
      </div>
      
      <div className="pb-20 md:pb-0">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </Layout>
  );
};

export default Feed;
