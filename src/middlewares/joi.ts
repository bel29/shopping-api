import { NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req, res, nextFunction:NextFunction) => {
    try {
      await schema.validate(req.body);
      nextFunction();
    } catch (error) {
      return res.status(422).json({ error });
    }
  };
};
export const Item_ShoppingListSchema = {
  item: Joi.object({
    id: Joi.string,
    name: Joi.string,
    description: Joi.string,
    cost: Joi.number,
  }),
  amount: Joi.number,
};

export const ItemSchema = {
  id: Joi.string,
  name: Joi.string,
  description: Joi.string,
  cost: Joi.number,
};

export const ShoppingListShema = {
  id: Joi.string,
  createdDate: Joi.date,
  dueDate: Joi.date,
  items: Joi.array().validate(Item_ShoppingListSchema),
};
