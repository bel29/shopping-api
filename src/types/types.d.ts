export interface ShoppingList {
    id: readonly string
    createdDate: readonly Date
    dueDate: Date
    items: Item_ShoppingList[]
  }
  
  export interface Item_ShoppingList {
    item: Item
    amount:number
  }

  export interface Item{
    id: readonly string
    name: string
    description: string
    cost: number
  }