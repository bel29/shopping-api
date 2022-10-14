import {
  DocumentType,
  getModelForClass,
  prop,
  Ref,
  ReturnModelType,
  pre,
} from "@typegoose/typegoose";
import ItemModel from "./Item";

export class Item_ShoppingList {
  item: Ref<typeof ItemModel>;
  @prop({ required: true })
  amount: number;
}
