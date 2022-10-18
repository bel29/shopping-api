import { z } from "zod";

export const createShoppingListSchema = z.object({
  body: z.object({
    items: z.array(
      z.object({
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
        amount: z.number({
          required_error: "amount is required",
          invalid_type_error: "amount must be a number",
        }),
      })
    ),
  }),
});

export const getByIdSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "id is required",
      invalid_type_error: "id must be a string",
    }),
  }),
});
export const updateShoppingListSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: "id is required",
      invalid_type_error: "id must be a string",
    }),
    items: z.array(
      z.object({
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
        amount: z.number({
          required_error: "amount is required",
          invalid_type_error: "amount must be a number",
        }),
      })
    ),
  }),
});
export type CreateListInput = z.TypeOf<typeof createShoppingListSchema>["body"];
export type GetIdInput = z.TypeOf<typeof getByIdSchema>["params"];
export type UpdateListInput = z.TypeOf<typeof updateShoppingListSchema>["body"];
