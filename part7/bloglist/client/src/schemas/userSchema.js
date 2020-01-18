import { schema } from "normalizr";
import { blogListSchema } from "./blogListSchema";

export const simpleUserSchema = new schema.Entity("users");
export const userSchema = new schema.Entity("users", {
  blogs: blogListSchema
});
