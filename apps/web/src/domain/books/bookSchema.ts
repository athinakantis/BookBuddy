import { z } from "zod";

export const bookFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  authorId: z.string().min(1, "Author is required"),
  status: z.enum(["UNREAD", "READ", "READING"]),
  rating: z.number().min(1).max(5).optional(),
  review: z
    .string()
    .min(1)
    .max(500, { message: "Max limit reached (500)" })
    .optional(),
});
