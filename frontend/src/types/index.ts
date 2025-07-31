export interface User {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  content: string;
  userId: number;
  createdAt: string;
  likeCount: number;
  dislikeCount: number;
  userReaction: "LIKE" | "DISLIKE" | null;
  authorId: string;
  authorName: string;
}

export interface Comment {
  id: string;
  content: string;
  postId: number;
  userId: number;
  createdAt: string;
  authorId: string;
  authorName: string;
}

export interface PostReactions {
  likeCount: number;
  dislikeCount: number;
  userReaction: "LIKE" | "DISLIKE" | null;
}

export interface AuthResponse {
  user: User;
  token: string;
}
