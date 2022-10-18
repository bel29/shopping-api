import ShoppingListModel from "../models/ShoppingList";

export async function save(list: any) {
  try {
    const listToSave = new ShoppingListModel({
      createdDate: new Date(),
      dueDate: list.dueDate != undefined ? list.dueDate : new Date(),
      items: list.items,
    });
    listToSave.save();
    return;
  } catch (err) {
    throw err;
  }
}
export async function update(_id: string, body: any) {
  try {
    const items = body.items;
    const dueDate = body.dueDate ? body.dueDate : new Date();
    try {
      const List = ShoppingListModel.findById(_id);
      console.log(List);
      const ListUpdated = {
        ...List,
        items,
        dueDate,
      };
      //const updateByIdResult = await ShoppingListModel.updateOne(() => {ShoppingListModel.findById(id.toString)},ListUpdated)
      // return updateByIdResult;
    } catch (error) {
      throw error;
    }
  } catch (err) {
    throw err;
  }
}

export async function toDelete(id: string) {
  try {
    console.log(id);
    ShoppingListModel.findByIdAndRemove(id, function (err: any) {
      if (err) {
        throw err;
      } else {
        return;
      }
    });
  } catch (err) {
    throw "Error while deleting " + err;
  }
}
