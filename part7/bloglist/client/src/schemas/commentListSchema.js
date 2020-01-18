import { schema } from "normalizr";

const commentSchema = new schema.Entity("comments");

export const commentListSchema = [commentSchema];
