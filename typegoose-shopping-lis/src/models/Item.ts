import { getModelForClass, prop } from "@typegoose/typegoose";

class Item {
  @prop({ required: true })
  name: string;
  @prop({ required: true })
  description: string;
  @prop({ required: true })
  cost: number;
}

const ItemModel = getModelForClass(Item);
export default ItemModel;
