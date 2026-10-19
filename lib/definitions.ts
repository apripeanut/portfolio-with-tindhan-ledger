import { z } from "zod";

// Authentication validation
export const CredentialsSchema = z.object({
  email: z.email({
    error: "Enter a valid email.",
  }),
  password: z.string().min(6, {
    error: "The password needs at least 6 characters.",
  }),
});

// Error handling
export function problemFor(e: unknown) {
  const m = e instanceof Error ? e.message : "";
  if (m === "timeout") return "The server took too long.";
  if (m === "offline") return "The server did not answer. Check it is running.";
  if (m === "404") return "That is not there any more.";
  return "Something went wrong.";
}

// Project post validation
export const ProjectPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { error: "The title needs at least 3 characters." }),

  year: z.coerce
    .number()
    .int()
    .min(2000)
    .max(2100, { error: "Enter a year like 2026." }),

  summary: z.string().trim().min(10, {
    error: "The description needs at least 10 characters.",
  }),

  image: z
    .instanceof(File)
    .refine((f) => ["image/png", "image/jpeg", "image/webp"].includes(f.type), {
      message: "Use PNG, JPEG, or WebP.",
    })
    .refine((f) => f.size <= 2 * 1024 * 1024, {
      message: "Image must be 2 MB or smaller.",
    }),
});
