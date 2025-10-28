import { Heart, Share2, MessageCircle, MoreHorizontal } from 'lucide-react';
import { Post } from '@/types';
import { Button } from './ui/button';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { likeService } from '@/services/likeService';
import { useToast } from '@/hooks/use-toast';

interface PostCardProps {
  post: Post;
  onUpdate?: () => void;
}

export const PostCard = ({ post, onUpdate }: PostCardProps) => {
  const [liked, setLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [sharesCount, setSharesCount] = useState(post.sharesCount);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLike = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (liked) {
        await likeService.unlikePost(post.id);
        setLiked(false);
        setLikesCount(likesCount - 1);
      } else {
        await likeService.likePost(post.id);
        setLiked(true);
        setLikesCount(likesCount + 1);
      }
      onUpdate?.();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update like status',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    setSharesCount(sharesCount + 1);
  };

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  return (
    <article className="border-b border-border p-4 hover:bg-muted/30 transition-colors">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold flex-shrink-0">
          {post.author.displayName[0].toUpperCase()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold hover:underline cursor-pointer">
              {post.author.displayName}
            </span>
            <span className="text-muted-foreground text-sm">
              @{post.author.username}
            </span>
            <span className="text-muted-foreground text-sm">·</span>
            <span className="text-muted-foreground text-sm">{timeAgo}</span>
            <Button variant="ghost" size="icon" className="ml-auto -mr-2 h-8 w-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>

          {/* Post Content */}
          <p className="text-foreground mb-3 whitespace-pre-wrap">{post.content}</p>

          {/* Actions */}
          <div className="flex items-center gap-8">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 -ml-2"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              <span className="text-sm">{post.commentsCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-muted-foreground hover:text-green-500 hover:bg-green-500/10"
            >
              <Share2 className="w-4 h-4 mr-1" />
              <span className="text-sm">{sharesCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`text-muted-foreground hover:text-red-500 hover:bg-red-500/10 ${
                liked ? 'text-red-500' : ''
              }`}
            >
              <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-current' : ''}`} />
              <span className="text-sm">{likesCount}</span>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};
