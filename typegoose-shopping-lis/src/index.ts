require("dotenv").config();
import express from "express";
import config from "./config/default";
import connectToDb from "./utils/connectToDb";
import log from "./utils/logger";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(router);

const port = config.port;

app.listen(port, () => {
  log.info(`App started at http://localhost:${port}`);

  connectToDb();
});
// async function connectDB() {
//   const db = await mongoose.connect(
//     "mongodb://localhost:27017/typegoose-shopping-api"
//   );
//   console.log("database is connected to", db.connection.db.databaseName);
// }
// mongoose.connection.on('error', err => {
//     console.log(err);
// })
// connectDB();
async function executeQueries() {
  //SAVE AN ITEM
  // const itemToSave = new Item({
  //     name: "prueba",
  //     description:"description",
  //     cost: 3
  //   });
  //   itemToSave.save()
  //console.log(itemToSave)
  //FIND ALL ITEMS
  //   const items = await Item.find();
  //   console.log(items);
  //FIND ITEM BY ID
  //const item = await Item.findById("6243c83c92f9347aa18db288");
  // UPDATE ITEM BY ID
  // const item = await Item.findByIdAndUpdate(
  //   "6243c83c92f9347aa18db288",
  //   {
  //     name: "ruler",
  //   },
  //   { new: true }
  // );
  // console.log(item);
  // DELETE ITEM BY ID
  // const item = await Item.findByIdAndDelete("6243c83c92f9347aa18db288");
  // console.log(user)
}

executeQueries();
