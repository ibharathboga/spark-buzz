import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { User } from '@/types';
import { userService } from '@/services/userService';
import { useToast } from '@/hooks/use-toast';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (value.trim()) {
      setLoading(true);
      try {
        const users = await userService.searchUsers(value);
        setResults(users);
      } catch (error) {
        toast({
          title: 'Search failed',
          description: 'Could not search users',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <Layout>
      <div className="border-b border-border sticky top-0 bg-background z-10 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search users..."
            className="pl-12 rounded-full"
          />
        </div>
      </div>

      <div className="pb-20 md:pb-0">
        {loading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
        
        {!loading && results.length === 0 && query && (
          <div className="p-8 text-center text-muted-foreground">
            No users found matching "{query}"
          </div>
        )}
        
        {!loading && results.length === 0 && !query && (
          <div className="p-8 text-center text-muted-foreground">
            Search for users by name, username, or bio
          </div>
        )}

        {results.map((user) => (
          <div key={user.id} className="border-b border-border p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold flex-shrink-0">
                {user.displayName[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <p className="font-bold">{user.displayName}</p>
                    <p className="text-sm text-muted-foreground">@{user.username}</p>
                  </div>
                  <Button size="sm" className="rounded-full">
                    Follow
                  </Button>
                </div>
                {user.bio && (
                  <p className="text-sm text-muted-foreground mt-2">{user.bio}</p>
                )}
                <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                  <span>
                    <strong className="text-foreground">{user.followersCount}</strong> Followers
                  </span>
                  <span>
                    <strong className="text-foreground">{user.followingCount}</strong> Following
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default SearchPage;
