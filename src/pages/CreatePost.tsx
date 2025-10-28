import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { postService } from '@/services/postService';

const MAX_CHARS = 280;

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const charsLeft = MAX_CHARS - content.length;
  const progress = (content.length / MAX_CHARS) * 100;
  const isOverLimit = content.length > MAX_CHARS;
  const isNearLimit = content.length >= 260;

  const handlePost = async () => {
    if (content.trim() && !isOverLimit) {
      setLoading(true);
      try {
        await postService.createPost({ content });
        toast({
          title: 'Post created!',
          description: 'Your post has been published successfully.',
        });
        navigate('/');
      } catch (error) {
        toast({
          title: 'Failed to create post',
          description: 'Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Layout>
      <div className="border-b border-border sticky top-0 bg-background z-10">
        <div className="flex items-center gap-4 p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Create Post</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          className="min-h-[200px] text-lg resize-none border-none focus-visible:ring-0 p-0"
        />

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            {/* Progress Circle */}
            <div className="relative w-10 h-10">
              <svg className="transform -rotate-90 w-10 h-10">
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 16}`}
                  strokeDashoffset={`${2 * Math.PI * 16 * (1 - progress / 100)}`}
                  className={`transition-all ${
                    isOverLimit
                      ? 'text-destructive'
                      : isNearLimit
                      ? 'text-yellow-500'
                      : 'text-primary'
                  }`}
                />
              </svg>
              <span
                className={`absolute inset-0 flex items-center justify-center text-xs font-semibold ${
                  isOverLimit
                    ? 'text-destructive'
                    : isNearLimit
                    ? 'text-yellow-500'
                    : 'text-muted-foreground'
                }`}
              >
                {charsLeft < 20 ? charsLeft : ''}
              </span>
            </div>
          </div>

          <Button
            onClick={handlePost}
            disabled={!content.trim() || isOverLimit || loading}
            className="rounded-full px-6"
          >
            {loading ? 'Posting...' : 'Post'}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePost;
