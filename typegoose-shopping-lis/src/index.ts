import mongoose from 'mongoose'
import  Item from './models/Item'


async function connectDB(){
    const db = await mongoose.connect("mongodb://localhost:27017/typegoose-shopping-api");
    console.log('database is connected to', db.connection.db.databaseName)
}

connectDB()
async function executeQueries(){
    const itemToSave = new Item({
        name: "prueba",
        description:"description",
        cost: 3
      });
      itemToSave.save()
      console.log(itemToSave)
}

executeQueries()