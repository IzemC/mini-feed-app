import { v4 as uuidv4 } from "uuid";
import db from "../config/db.js";
import { getUser } from "./users.service.js";

export const populatePost = (post, userId) => {
  return {
    ...post,
    ...getPostReactions(post.id, userId),
    authorName: getUser(post.authorId)?.name,
  };
};

export const getComment = (id) => {
  const comment = db.comments.find((c) => c.id === id);

  return {
    ...comment,
    authorName: getUser(comment.authorId)?.name,
  };
};

export const getPostReactionsCount = (postId, type) => {
  const postReactions = db.postReactions.filter(
    (r) => r.postId === postId && r.type === type
  );
  return postReactions.length;
};

export const getUserReaction = (postId, userId) => {
  const reaction = db.postReactions.find(
    (r) => r.postId === postId && r.userId === userId
  );
  return reaction;
};

export const getPostReactions = (postId, userId) => {
  return {
    likeCount: getPostReactionsCount(postId, "LIKE"),
    dislikeCount: getPostReactionsCount(postId, "DISLIKE"),
    userReaction: getUserReaction(postId, userId)?.type,
  };
};

export const togglePostReaction = (postId, userId, type) => {
  if (removePostReaction(postId, userId)) return;
  const postReaction = {
    id: uuidv4(),
    postId,
    userId,
    type,
    createdAt: new Date().toISOString(),
  };

  db.postReactions.unshift(postReaction);
};

export const removePostReaction = (postId, userId, type) => {
  const postReactionIndex = db.postReactions.findIndex(
    (r) =>
      r.postId === postId && r.userId === userId && (!type || type === r.type)
  );

  if (postReactionIndex > -1) {
    db.postReactions.splice(postReactionIndex, 1);
    return true;
  }
};

export const addComment = (postId, userId, content) => {
  const comment = {
    id: uuidv4(),
    postId,
    content: content.trim(),
    authorId: userId,
    createdAt: new Date().toISOString(),
  };

  db.comments.unshift(comment);
  return comment;
};

export const addPost = (content, userId) => {
  const post = {
    id: uuidv4(),
    content: content.trim(),
    authorId: userId,
    createdAt: new Date().toISOString(),
  };

  db.posts.unshift(post);

  return post;
};
