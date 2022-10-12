import { Item} from "./types/types"

const parseDate = (dateFromRequest: any):string=> {
    if(!isDate(dateFromRequest) || !isString(dateFromRequest)){
        throw new Error ('Incorrect or missing date')
    }
    return dateFromRequest
   
}
const isString = (string: string):boolean => {
    return typeof string == 'string' 
   
}
const isDate = (date: string):boolean => {
    return Boolean(Date.parse(date)) 
   
}

const parseItem = (ItemRequest: any):Item => {
    if(typeof ItemRequest !== 'object' || !isItem(ItemRequest)){
        throw new Error ('Incorrect or missing Item')
    }
    return ItemRequest
}
const isItem = (ItemRequest:Object):boolean => {
   let arrProperties =  Object.getOwnPropertyNames(ItemRequest)
    return( arrProperties.includes('name') && arrProperties.includes('description') &&  arrProperties.includes('cost') &&  arrProperties.includes('id') )
}

const toNewEntry = (object: any):Item =>{
    const newEntry:any = {
        item: parseItem(object)
    }
    return newEntry
}
export default toNewEntry