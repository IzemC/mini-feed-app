import { useCreatePost } from "@/hooks/use-posts";
import { Send } from "lucide-react";
import { useState } from "react";
import { SubmitButton } from "./ui/submit-button";

export const CreatePost = () => {
  const [text, setText] = useState("");
  const createPost = useCreatePost();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Please enter some text for your post");
      return;
    }
    createPost.mutate(text.trim(), {
      onSuccess: () => setText(""),
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Create a new post
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError(null);
            }}
            placeholder="What's on your mind?"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
            rows={4}
            maxLength={500}
            disabled={createPost.isPending}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {text.length}/500 characters
            </span>
            {error && <span className="text-sm text-red-500">{error}</span>}
          </div>
        </div>

        <SubmitButton
          isLoading={createPost.isPending}
          disabled={createPost.isPending || !text.trim()}
        >
          <Send className="w-4 h-4" /> Post
        </SubmitButton>
      </form>
    </div>
  );
};
