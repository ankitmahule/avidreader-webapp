import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const quoteFileSchema = z
  .custom<File | null>(
    (value) =>
      value === null || (typeof File !== "undefined" && value instanceof File),
    {
      error: "Select a valid image",
    },
  )
  .refine((file) => !file || file.size <= MAX_IMAGE_SIZE, {
    error: "Image must be smaller than 5 MB",
  })
  .refine((file) => !file || ALLOWED_IMAGE_TYPES.includes(file.type), {
    error: "Only JPG, PNG, WebP and GIF images are allowed",
  });

export const addQuoteSchema = z
  .object({
    content: z.string().trim().max(1000, {
      error: "Quote must not contain more than 1000 characters",
    }),

    file: quoteFileSchema,
  })
  .superRefine((values, context) => {
    if (!values.content && !values.file) {
      context.addIssue({
        code: "custom",
        path: ["content"],
        message: "Enter a quote or select an image",
      });
    }
  });

export type AddQuoteFormValues = z.input<typeof addQuoteSchema>;
export type AddQuoteFormOutput = z.output<typeof addQuoteSchema>;
