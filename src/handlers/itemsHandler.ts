import fs from 'fs'
import path from 'path'
import { Item } from '../types/types'
class itemsHandler {
    constructor() {}


  getAll = async (): Promise<Item[]> => {
    try {
      const content = await fs.promises.readFile(
        path.resolve(__dirname, '../data/items.json'),
        'utf-8'
      )
      const items = JSON.parse(content || '[]')
      return items
    } catch (err) {
      console.log(err.message)
      return []
    }
  }
  getById = async (itemId: string): Promise<Item> => {
    try {
      const items = await this.getAll()
      const item = items.find(it => it.id === itemId)

      if (item) return item
      return null
    } catch (err) {
      console.log(err.message)
      return null
    }
  }
  //post item
  save = async (item: Item) => {
    try {
      const items = await this.getAll()
      items.push(item)

      await fs.promises.writeFile(
        path.resolve(__dirname, '../data/items.json'),
        JSON.stringify(items)
      )
    } catch (err) {
      console.log(err.message)
    }
  }
  updateById = async (item: Item) => {
    try {
      const { id, name, description, cost } = item
      const items = await this.getAll()
      const itemIndex = items.findIndex(it => it.id === id)

      if (itemIndex < 0) return -1

      const newitem = {
        ...items[itemIndex],
        name,
        description,
        cost
      }
      items[itemIndex] = newitem
      await fs.promises.writeFile(
        path.resolve(__dirname, '../data/items.json'),
        JSON.stringify(items)
      )
    } catch (err) {
      return console.log(err.message)
    }
  }
  deleteById = async (itemId: string) => {
    try {
      const allItems = await this.getAll()
      const itemToDelete = allItems.find(prod => prod.id === itemId)

      if (itemToDelete) {
        const newitems = allItems.filter(prod => prod.id !== itemId)

        await fs.promises.writeFile(
          path.resolve(__dirname, '../data/items.json'),
          JSON.stringify(newitems)
        )
      } else {
        return -1
      }
    } catch (err) {
      return console.log(err.message)
    }
  }


}

export default itemsHandler