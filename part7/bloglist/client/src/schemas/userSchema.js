import { schema } from "normalizr";

const simpleBlogSchema = new schema.Entity("blogs");
export const userSchema = new schema.Entity("users", {
  blogs: [simpleBlogSchema]
});
