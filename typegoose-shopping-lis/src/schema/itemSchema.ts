import { z } from "zod";

export const createItemSchema = z.object({
  body: z.object({
    item: z.object({
      name: z.string({
        required_error: "name is required",
        invalid_type_error: "name must be a string",
      }),
      description: z.string({
        required_error: "description is required",
        invalid_type_error: "description must be a string",
      }),
      cost: z.number({
        required_error: "cost is required",
        invalid_type_error: "cost must be a number",
      }),
    }),
  }),
});
export const updateItemSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: "id is required",
      invalid_type_error: "id must be a string",
    }),
    item: z.object({
      name: z.string({
        required_error: "name is required",
        invalid_type_error: "name must be a string",
      }),
      description: z.string({
        required_error: "description is required",
        invalid_type_error: "description must be a string",
      }),
      cost: z.number({
        required_error: "cost is required",
        invalid_type_error: "cost must be a number",
      }),
    }),
  }),
});
export type CreateItemInput = z.TypeOf<typeof createItemSchema>["body"];
export type UpdateItemInput = z.TypeOf<typeof updateItemSchema>["body"];
