import { CommentSection } from "@/components/comment-section";
import { useComments, usePostReactions } from "@/hooks/use-posts";
import type { Post } from "@/types";
import { cn } from "@/utils/cn";
import {
  ChevronDown,
  ChevronUp,
  MessageCircle,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";

export const PostCard = ({ post }: { post: Post }) => {
  const [showComments, setShowComments] = useState(false);
  const { likePost, dislikePost } = usePostReactions(post.id);
  const { data: comments } = useComments(post.id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = (now.getTime() - date.getTime()) / 1000;

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-3 mb-4">
        <Avatar userId={post.authorId} userName={post.authorName} />
        <div>
          <p className="font-medium text-gray-900">{post.authorName}</p>
          <p className="text-gray-500 text-xs">{formatDate(post.createdAt)}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 py-3 border-t border-gray-100">
        <button
          onClick={() => likePost.mutate()}
          disabled={likePost.isPending}
          className={cn(
            "flex items-center gap-1 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 disabled:opacity-50",
            post.userReaction === "LIKE"
              ? "bg-green-50 text-green-600"
              : "bg-gray-50 text-gray-600 hover:bg-green-50"
          )}
        >
          <ThumbsUp className="w-4 h-4" />
          <span className="text-sm font-medium w-[1em]">{post.likeCount}</span>
        </button>

        <button
          onClick={() => dislikePost.mutate()}
          disabled={dislikePost.isPending}
          className={cn(
            "flex items-center gap-1 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 disabled:opacity-50",
            post.userReaction === "DISLIKE"
              ? "bg-red-50 text-red-600"
              : "bg-gray-50 text-gray-600 hover:bg-red-50"
          )}
        >
          <ThumbsDown className="w-4 h-4" />
          <span className="text-sm font-medium w-[1em]">
            {post.dislikeCount}
          </span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm font-medium">
            {comments?.length || 0}{" "}
            {(comments?.length || 0) === 1 ? "comment" : "comments"}
          </span>
          {showComments ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {showComments && <CommentSection postId={post.id} />}
    </div>
  );
};
