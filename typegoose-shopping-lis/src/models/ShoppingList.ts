import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import Item_ShoppingListModel from "./Item_ShoppingList";

class ShoppingList {
  @prop({ required: false })
  createdDate: Date;
  @prop({ required: false })
  dueDate: Date;
  @prop({ required: true })
  items: Ref<typeof Item_ShoppingListModel>[];
}
const ShoppingListModel = getModelForClass(ShoppingList);
export default ShoppingListModel;
