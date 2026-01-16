import z from "zod";

export const authorFormSchema = z.object({
  name: z.string().min(1).max(50)
})