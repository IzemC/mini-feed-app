import { useComments, useCreateComment } from "@/hooks/use-posts";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { SubmitButton } from "./ui/submit-button";
import { Avatar } from "@/components/ui/avatar";

export const CommentSection = ({ postId }: { postId: string }) => {
  const [commentText, setCommentText] = useState("");
  const { data: comments, isLoading, isError } = useComments(postId);
  const createComment = useCreateComment(postId);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) {
      setError("Please enter a comment");
      return;
    }
    createComment.mutate(commentText.trim(), {
      onSuccess: () => setCommentText(""),
    });
  };

  if (isLoading) {
    return (
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-4 pt-4 border-t border-gray-100 text-center text-sm text-red-500">
        Failed to load comments
      </div>
    );
  }

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="space-y-3 mb-4">
        {comments?.map((comment) => {
          return (
            <div key={comment.id} className="flex gap-3">
              <Avatar
                userId={comment.authorId}
                userName={comment.authorName}
                className="size-8 shrink-0"
              />
              <div className="bg-gray-50 rounded-lg p-3 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm text-gray-900">
                    {comment.authorName}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-gray-800 text-sm leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={commentText}
          onChange={(e) => {
            setCommentText(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Write a comment..."
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          disabled={createComment.isPending}
          maxLength={200}
        />
        <SubmitButton
          isLoading={createComment.isPending}
          disabled={createComment.isPending || !commentText.trim()}
        >
          <Send className="w-3 h-3" />
        </SubmitButton>
      </form>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};
