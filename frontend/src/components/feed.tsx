import { useEffect, useRef, useMemo } from "react";
import { PostCard } from "@/components/post-card";
import { AlertCircle, RefreshCw, Loader2 } from "lucide-react";
import { usePosts } from "@/hooks/use-posts";

export const Feed = () => {
  const {
    data,
    isError,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = usePosts();

  const loaderRef = useRef<HTMLDivElement>(null);

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.list) || [],
    [data]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="pb-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Latest Posts</h2>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 cursor-pointer"
          disabled={isLoading}
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {isError ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div>
              <h3 className="text-red-800 font-medium">Failed to load feed</h3>
              <button
                onClick={() => refetch()}
                className="text-red-800 hover:text-red-900 text-sm font-medium mt-2 underline"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
          <p className="text-gray-500 text-lg">No posts yet</p>
          <p className="text-gray-400 text-sm mt-2">
            Be the first to share something!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          <div ref={loaderRef} className="flex justify-center py-4">
            {isFetchingNextPage ? (
              <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
            ) : hasNextPage ? (
              <button
                onClick={() => fetchNextPage()}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Load more
              </button>
            ) : (
              <p className="text-gray-500 text-sm">You've reached the end</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
