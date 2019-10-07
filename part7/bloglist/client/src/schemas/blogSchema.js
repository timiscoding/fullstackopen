import { schema } from "normalizr";

const userSchema = new schema.Entity("users");
const commentSchema = new schema.Entity("comments");
export const blogSchema = new schema.Entity("blogs", {
  user: userSchema,
  comments: [commentSchema]
});
