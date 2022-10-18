import { Request, Response } from "express";
import { save, toDelete, update } from "../handlers/itemHandler";
import ItemModel from "../models/Item";
import { CreateItemInput, UpdateItemInput } from "../schema/itemSchema";
import { GetIdInput } from "../schema/shoppingListSchema";

class itemController {
  constructor() {}

  getItems = async (req: Request, res: Response): Promise<any> => {
    try {
      const item = await ItemModel.find();
      return res.json({ success: true, result: item });
      return item;
    } catch (err) {
      throw "Problem getting items";
    }
  };

  getById = async (
    req: Request<{ id: string }, {}, GetIdInput>,
    res: Response
  ): Promise<any> => {
    const params = req.params;
    try {
      const item = await ItemModel.findById(params.id);
      return res.json({ success: true, result: item });
    } catch (err) {
      throw res.status(500).json({
        success: false,
        message: "An error has ocurred getting the item",
        error: err,
      });
    }
  };
  createItem = async (
    req: Request<{}, {}, CreateItemInput>,
    res: Response
  ): Promise<any> => {
    const body = req.body.item;
    try {
      const item = await save(body.name, body.description, body.cost);
      return res.json({ success: true, result: "item saved " });
    } catch (err) {
      throw err;
    }
  };
  updateItem = async (
    req: Request<{ id: string }, {}, UpdateItemInput>,
    res: Response
  ): Promise<any> => {
    const {
      params: { id },
    } = req;
    try {
      const item = await update(id, req.body);
      if (item != null)
        return res.json({
          success: true,
          result: "Item updated succesfully! ",
        });
      else {
        throw "Item not found";
      }
    } catch (err) {
      throw res.json({ success: false, result: err });
    }
  };
  deleteItem = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response
  ): Promise<any> => {
    const {
      params: { id },
    } = req;
    try {
      const item = await toDelete(id);
      if (item != null)
        return res.json({
          success: true,
          result: "Item deleted succesfully! ",
        });
      else {
        throw "Item not found";
      }
    } catch (err) {
      throw res.json({ success: false, result: err });
    }
  };
}
export default itemController;
