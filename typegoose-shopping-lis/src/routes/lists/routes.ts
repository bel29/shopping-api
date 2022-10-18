import express from "express";
import ListController from "../../controllers/listController";
import requireId from "../../middlewares/requireId";
import validateResource from "../../middlewares/validateResource";
import {
  createShoppingListSchema,
  getByIdSchema,
  updateShoppingListSchema,
} from "../../schema/shoppingListSchema";
const router = express.Router();

const listController = new ListController();
router.get("/", listController.getLists);
router.get("/:id", requireId(getByIdSchema), listController.getById);
router.post(
  "/",
  validateResource(createShoppingListSchema),
  listController.createList
);
router.put(
  "/:id",
  validateResource(updateShoppingListSchema),
  listController.updateList
);
router.delete("/:id", listController.deleteById);
export default router;
