import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import ItemModel from "./Item";

class Item_ShoppingList {
  item: Ref<typeof ItemModel>;
  @prop({ required: true })
  amount: number;
}
const Item_ShoppingListModel = getModelForClass(Item_ShoppingList);
export default Item_ShoppingListModel;
