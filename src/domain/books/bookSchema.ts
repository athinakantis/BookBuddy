import { z } from "zod";

export const bookFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.object({
    id: z.string(),
    name: z.string().optional(),
  }),
  status: z.enum(["UNREAD", "READ", "READING"]),
  rating: z.number().min(1).max(5).optional().nullable(),
  review: z
    .string()
    .max(500, { message: "Max limit reached (500)" })
    .nullable(),
});
