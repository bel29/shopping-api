import express from "express";
import authMiddleware from "../../middlewares/auth";
import { v4 as uuidv4 } from 'uuid'
import ListHandler from "../../handlers/listHandler";
import {Item_ShoppingList, ShoppingList } from "../../types/types";
import toNewEntry from "../../utils";

const router = express.Router();

const listHandler = new ListHandler();

router.get("/", async (_req, res) => {
  try {
    const lists = await listHandler.getAll();
    return res.json({ success: true, result: lists });
  } catch (err) {
    return res.status(500).json({
      succes: false,
      error: "An error has ocurred getting all lists",
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const list = await listHandler.getById(id);
    if (list) {
      res.json({ success: true, result: list });
    } else {
      res.status(404).json({ success: false, error: "list not found" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "An error has ocurred getting the list",
    });
  }
});
router.post("/", authMiddleware, async (req, res) => {
  try {
    const itemsArray = [];
    const arr = req.body;
    arr.forEach(element => {
        const { item, amount } = element
        if (!item || !amount) {
            return res.status(400).json({
                success: false,
                error: "Wrong body format: missing fields",
            });
        }
        if (typeof amount !== "number") {
            return res.status(400).json({
                success: false,
                error: "Wrong body format: incorrect types",
            });
        }
        const newItemEntry = toNewEntry(element);
        const newItem: Item_ShoppingList = {
        item: newItemEntry,
        amount,
        };
        itemsArray.push(newItem)
    
    });
    const newList: ShoppingList = {
        id: uuidv4(),
        items:itemsArray,
        createdDate: new Date(),
        dueDate: new Date(),//TODO:Change this

    }

    await listHandler.save(newList);
    return res.json({ success: true, result: newList });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "An error has ocurred saving the List",
    });
  }
});
export default router;
