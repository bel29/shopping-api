import {
  DocumentType,
  getModelForClass,
  prop,
  Ref,
  ReturnModelType,
  pre,
} from "@typegoose/typegoose";
import { Item_ShoppingList } from "./Item_ShoppingList";

export class ShoppingList {
  @prop({ required: true })
  createdDate: Date;
  @prop({ required: true })
  dueDate: Date;
  @prop({ required: true })
  items: Ref<Item_ShoppingList>[];
}
