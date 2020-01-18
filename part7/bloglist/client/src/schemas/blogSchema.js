import { schema } from "normalizr";

const userSchema = new schema.Entity("users");
export const blogSchema = new schema.Entity("blogs", {
  user: userSchema
});
