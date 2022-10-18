import express from "express";
import ItemController from "../../controllers/itemController";
import validateResource from "../../middlewares/validateResource";
import { createItemSchema, updateItemSchema } from "../../schema/itemSchema";
const router = express.Router();

const itemController = new ItemController();
router.get("/", itemController.getItems);
router.get("/:id", itemController.getById);
router.post("/", validateResource(createItemSchema), itemController.createItem);
router.put(
  "/:id",
  validateResource(updateItemSchema),
  itemController.updateItem
);
router.delete("/:id", itemController.deleteItem);
export default router;
