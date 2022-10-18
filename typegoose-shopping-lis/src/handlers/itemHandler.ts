import ItemModel from "../models/Item";

export async function save(name: string, description: string, cost: number) {
  try {
    const itemToSave = new ItemModel({
      name,
      description,
      cost,
    });
    itemToSave.save();
    return;
  } catch (err) {
    throw err;
  }
}

export async function update(id: string, body: any) {
  try {
    const name = body.name;
    const description = body.description;
    const cost = body.cost;
    try {
      const item = ItemModel.findById(id.toString);
      console.log(item);
      const itemUpdated = {
        ...item,
        name,
        description,
        cost,
      };
      //const updateByIdResult = await ItemModel.updateOne(() => {ItemModel.findById(id.toString)},itemUpdated)
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
    ItemModel.findByIdAndRemove(id, function (err: any) {
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
