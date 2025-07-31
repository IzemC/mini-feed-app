import type { AuthResponse, Comment, Post, PostReactions } from "@/types";
import axios, { AxiosError } from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class ApiService {
  static async register(name: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>("/auth/register", {
        name,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || "Registration failed");
      }
      throw new Error("Registration failed");
    }
  }

  static async getPosts(
    cursor: string | null = null,
    limit = 10
  ): Promise<{
    list: Post[];
    nextCursor: string | null;
    hasMore: boolean;
  }> {
    try {
      const response = await apiClient.get(`/posts`, {
        params: { cursor, limit },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || "Failed to fetch posts");
      }
      throw new Error("Failed to fetch posts");
    }
  }

  static async createPost(content: string): Promise<Post> {
    try {
      const response = await apiClient.post<Post>("/posts", { content });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || "Failed to create post");
      }
      throw new Error("Failed to create post");
    }
  }

  static async likePost(postId: string): Promise<PostReactions> {
    try {
      const response = await apiClient.post<PostReactions>(
        `/posts/${postId}/like`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || "Failed to like post");
      }
      throw new Error("Failed to like post");
    }
  }

  static async dislikePost(postId: string): Promise<PostReactions> {
    try {
      const response = await apiClient.post<PostReactions>(
        `/posts/${postId}/dislike`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "Failed to dislike post"
        );
      }
      throw new Error("Failed to dislike post");
    }
  }

  static async getComments(postId: string): Promise<Comment[]> {
    try {
      const response = await apiClient.get<Comment[]>(
        `/posts/${postId}/comments`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "Failed to fetch comments"
        );
      }
      throw new Error("Failed to fetch comments");
    }
  }

  static async createComment(
    postId: string,
    content: string
  ): Promise<Comment> {
    try {
      const response = await apiClient.post<Comment>(
        `/posts/${postId}/comments`,
        { content }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          (error as AxiosError<{ error: string }>).response?.data?.error ||
            "Failed to create comment"
        );
      }
      throw new Error("Failed to create comment");
    }
  }
}
