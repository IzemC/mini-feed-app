import express from "express";
import db from "../config/db.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  addComment,
  addPost,
  getComment,
  populatePost,
  getPostReactions,
  removePostReaction,
  togglePostReaction,
} from "../services/posts.service.js";

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  const userId = req.user.id;
  const limit = parseInt(req.query.limit) || 10;
  const cursor = req.query.cursor;

  let startIndex = 0;
  if (cursor) {
    const cursorIndex = db.posts.findIndex((post) => post.id === cursor);
    startIndex = cursorIndex >= 0 ? cursorIndex + 1 : 0;
  }

  const endIndex = Math.min(startIndex + limit, db.posts.length);
  const posts = db.posts.slice(startIndex, endIndex);

  const nextCursor = posts.length > 0 ? posts[posts.length - 1].id : null;
  const hasMore = endIndex < db.posts.length;

  res.json({
    list: posts.map((post) => populatePost(post, userId)),
    nextCursor,
    hasMore,
  });
});

router.post("/", authenticate, (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;
  if (!content || content.trim().length === 0) {
    return res.status(400).json({ error: "Content is required" });
  }

  const post = addPost(content, userId);

  res.status(201).json(populatePost(post, userId));
});

router.post("/:id/like", authenticate, (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  const post = db.posts.find((p) => p.id === postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  removePostReaction(post.id, userId, "DISLIKE");
  togglePostReaction(post.id, userId, "LIKE");

  res.json(getPostReactions(post.id, userId));
});

router.post("/:id/dislike", authenticate, (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  const post = db.posts.find((p) => p.id === postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  removePostReaction(post.id, userId, "LIKE");
  togglePostReaction(post.id, userId, "DISLIKE");

  res.json(getPostReactions(post.id, userId));
});

router.get("/:id/comments", authenticate, (req, res) => {
  const postId = req.params.id;
  const postComments = db.comments.filter((c) => c.postId === postId);

  res.json(postComments.map((c) => getComment(c.id)));
});

router.post("/:id/comments", authenticate, (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const { content } = req.body;

  if (!content || content.trim().length === 0) {
    return res.status(400).json({ error: "Comment content is required" });
  }

  const post = db.posts.find((p) => p.id === postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const comment = addComment(postId, userId, content);
  res.status(201).json(comment);
});

export default router;
