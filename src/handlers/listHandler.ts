import fs from "fs";
import path from "path";
import { Item, ShoppingList } from "../types/types";

class listHandler {
  constructor() {}

  getAll = async (): Promise<ShoppingList[]> => {
    try {
      const content = await fs.promises.readFile(
        path.resolve(__dirname, "../data/lists.json"),
        "utf-8"
      );
      const lists = JSON.parse(content || "[]");
      return lists;
    } catch (err) {
      console.log(err.message);
      return [];
    }
  };
  getById = async (listId: string): Promise<ShoppingList> => {
    try {
      const lists = await this.getAll();
      const list = lists.find((list) => list.id === listId);
      if (list) return list;
      return null;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  };
  save = async (list: ShoppingList) => {
    try {
      const lists = await this.getAll();
      lists.push(list);

      await fs.promises.writeFile(
        path.resolve(__dirname, "../data/lists.json"),
        JSON.stringify(lists)
      );
    } catch (err) {
      console.log(err.message);
    }
  };
  updateById = async (List: ShoppingList) => {
    try {
      const { id, items, dueDate } = List;
      const lst = await this.getAll();
      const listIndex = lst.findIndex((it) => it.id === id);

      if (listIndex < 0) return -1;

      const newlist = {
        ...lst[listIndex],
        items,
        dueDate,
      };
      lst[listIndex] = newlist;
      await fs.promises.writeFile(
        path.resolve(__dirname, "../data/lists.json"),
        JSON.stringify(lst)
      );
    } catch (err) {
      return console.log(err.message);
    }
  };
  deleteById = async (listId: string) => {
    try {
      const allLists = await this.getAll();
      const listToDelete = allLists.find((lst) => lst.id === listId);

      if (listToDelete) {
        const newlist = allLists.filter((lst) => lst.id !== listId);

        await fs.promises.writeFile(
          path.resolve(__dirname, "../data/lists.json"),
          JSON.stringify(newlist)
        );
      } else {
        return -1;
      }
    } catch (err) {
      return console.log(err.message);
    }
  };
  postItemInList = async (listId: string, itemToAdd: Item) => {
    try {
      const allLists = await this.getAll();
      const listToUpdate = allLists.find((lst) => lst.id === listId);

      if (listToUpdate) {
        const newItems = {
          ...listToUpdate.items,
          itemToAdd,
        };
        const newlist = {
          ...listToUpdate,
          newItems,
        };
        await fs.promises.writeFile(
          path.resolve(__dirname, "../data/lists.json"),
          JSON.stringify(newlist)
        );
      } else {
        return -1;
      }
    } catch (err) {
      return console.log(err.message);
    }
  };
  deleteItemInList = async (listId: string, itemId: string) => {
    try {
      const allLists = await this.getAll();
      const listToDelete = allLists.find((lst) => lst.id === listId);

      if (listToDelete) {
        const allItems = listToDelete.items;
        const newItems = allItems.filter((item) => item.item.id !== itemId);
        const newlist = {
          ...listToDelete,
          newItems,
        };
        await fs.promises.writeFile(
          path.resolve(__dirname, "../data/lists.json"),
          JSON.stringify(newlist)
        );
      } else {
        return -1;
      }
    } catch (err) {
      return console.log(err.message);
    }
  };
}
export default listHandler;
