import express from "express";
import authMiddleware from "../../middlewares/auth";
import { v4 as uuidv4 } from "uuid";
import ListHandler from "../../handlers/listHandler";
import { Item_ShoppingList, ShoppingList } from "../../types/types";
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
    const listArray = [];
    const arr = req.body.list;
    const date = req.body.list[1];
    if (arr) {
      arr.forEach((element: { List: any; amount: any }) => {
        //console.log(element)
        const { List, amount } = element;
        //console.log(List,amount)
        if (!List || !amount) {
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
        const newListEntry = toNewEntry(List);
        const newList: Item_ShoppingList = {
          item: newListEntry,
          amount,
        };
        return listArray.push(newList);
      });
      const newList: ShoppingList = {
        id: uuidv4(),
        items: listArray,
        createdDate: new Date(),
        dueDate: date != undefined ? date : new Date(),
      };

      await listHandler.save(newList);
      return res.json({ success: true, result: newList });
    } else {
      return res.status(500).json({
        success: false,
        error: "Empty body",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "An error has ocurred saving the List",
    });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const {
      params: { id },
      body: { items, dueDate },
    } = req;

    if (!items) {
      return res.status(400).json({
        success: false,
        error: "Wrong body format: missing fields",
      });
    }
    //TODO:check if item is an item
    //   if (typeof) {
    //     return res.status(400).json({
    //       success: false,
    //       error: 'Wrong body format: incorrect types'
    //     })
    //   }

    const List = await listHandler.getById(id);

    const ListUpdated: ShoppingList = {
      ...List,
      items,
      dueDate,
    };
    const updateByIdResult = await listHandler.updateById(ListUpdated);

    if (updateByIdResult === -1) {
      return res.status(404).json({
        success: false,
        error: `List with id ${id} does not exist`,
      });
    } else {
      return res.json({ success: true, result: ListUpdated });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "An error has ocurred updating the List" + err.message,
    });
  }
});
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteByIdResult = await listHandler.deleteById(id);

    if (deleteByIdResult === -1) {
      return res.status(404).json({
        success: false,
        error: `List with id ${id} does not exist`,
      });
    } else {
      return res.json({
        success: true,
        result: `List with id ${id} deleted`,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "An error has ocurred deleting the List",
    });
  }
});
router.post("/:id/items", authMiddleware, async (req, res) => {
  const {
    params: { id },
    body: { item },
  } = req;
  const postItem = await listHandler.postItemInList(id, item);
  if (postItem === -1) {
    return res.status(404).json({
      success: false,
      error: `List with id ${id} does not exist`,
    });
  } else {
    return res.json({
      success: true,
      result: `Item with id ${id} correctly added`,
    });
  }
});

router.delete(
  "/lists/:listId/items/:itemId",
  authMiddleware,
  async (req, res) => {
    const {
      params: { listId, itemId },
    } = req;
    const deleteItemInList = await listHandler.deleteItemInList(listId, itemId);
    if (deleteItemInList === -1) {
      return res.status(404).json({
        success: false,
        error: `List with id ${listId} does not exist`,
      });
    } else {
      return res.json({
        success: true,
        result: `Item with id ${itemId} correctly added`,
      });
    }
  }
);

export default router;
