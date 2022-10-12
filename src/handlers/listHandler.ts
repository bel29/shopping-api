import fs from 'fs'
import path from 'path'
import {ShoppingList} from '../types/types'



class listHandler{
   constructor(){}

getAll = async (): Promise<ShoppingList[]> => {
    try{
        const content = await fs.promises.readFile(
            path.resolve(__dirname, '../data/lists.json'),
            'utf-8'
          )
          const lists = JSON.parse(content || '[]')
          return lists
    }catch(err){
        console.log(err.message)
        return []

    }
}
getById = async (listId: string): Promise<ShoppingList> => {
    try {
      const lists = await this.getAll()
      const list = lists.find(list => list.id === listId)
      if (list) return list
      return null
    } catch (err) {
      console.log(err.message)
      return null
    }
  }
  save = async (list: ShoppingList) => {
    try {
      const lists = await this.getAll()
      lists.push(list)

      await fs.promises.writeFile(
        path.resolve(__dirname, '../data/lists.json'),
        JSON.stringify(lists)
      )
    } catch (err) {
      console.log(err.message)
    }
  }




}
export default listHandler