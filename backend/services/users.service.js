import { v4 as uuidv4 } from "uuid";
import db from "../config/db.js";

export const getUser = (id) => {
  return db.users.find((u) => u.id === id);
};

export const addUser = (name) => {
  const user = {
    id: uuidv4(),
    name: name.trim(),
    createdAt: new Date().toISOString(),
  };

  db.users.push(user);
  return user;
};
