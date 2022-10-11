import express from 'express'
import ItemsHandler from '../../handlers/itemsHandler'
import { v4 as uuidv4 } from 'uuid'
import {Item} from '../../types/types'
import authMiddleware from '../../middlewares/auth'


const router = express.Router()

const itemsHandler = new ItemsHandler()

router.get('/', async (_req, res) => {
    try {
      const items = await itemsHandler.getAll()
      return res.json({ success: true, result: items})
    } catch (err) {
     return  res.status(500).json({
        success: false,
        error: 'An error has ocurred getting all items'
      })
      
    }
})
router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params
      const item = await itemsHandler.getById(id)
      if (item) {
        res.json({ success: true, result: item })
      } else {
        res.status(404).json({ success: false, error: 'Item not found' })
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        error: 'An error has ocurred getting the item'
      })
    }
  })
  router.post('/', authMiddleware, async (req, res) => {
    try {
      const { name, description, cost } = req.body
  
      if (!name || !description || !cost) {
        return res.status(400).json({
          success: false,
          error: 'Wrong body format: missing fields'
        })
      }
      if (typeof name !== 'string' || typeof description !== 'string' || typeof cost !== 'number' ) {
        return res.status(400).json({
          success: false,
          error: 'Wrong body format: incorrect types'
        })
      }
  
      const newItem: Item = { 
        id: uuidv4(),
        name,
        description,
        cost
      }
      await itemsHandler.save(newItem)
      return res.json({ success: true, result: newItem })
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'An error has ocurred saving the item'
      })
      
    }
  })

router.put('/:id', authMiddleware, async (req, res) => {
    try {
      const {
        params: { id },
        body: { name, description, cost }
      } = req
  
      if (!name || !description || !cost) {
        return res.status(400).json({
          success: false,
          error: 'Wrong body format: missing fields'
        })
      }
      if (typeof name !== 'string' || typeof description !== 'string' || typeof cost !== 'number') {
        return res.status(400).json({
          success: false,
          error: 'Wrong body format: incorrect types'
        })
      }
  
      const Item = await itemsHandler.getById(id)
  
      const ItemUpdated: Item = { 
        ...Item,
        name,
        description,
        cost
      }
      const updateByIdResult = await itemsHandler.updateById(ItemUpdated)
  
      if (updateByIdResult === -1) {
        return res.status(404).json({
          success: false,
          error: `Item with id ${id} does not exist`
        })
      } else {
        return res.json({ success: true, result: ItemUpdated })
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'An error has ocurred updating the Item'
      })
    }
  })

  router.delete('/:id', authMiddleware, async (req, res) => {
    try {
      const { id } = req.params
      const deleteByIdResult = await itemsHandler.deleteById(id)
  
      if (deleteByIdResult === -1) {
        return res.status(404).json({
          success: false,
          error: `Item with id ${id} does not exist`
        })
      } else {
        return res.json({
          success: true,
          result: `Item with id ${id} deleted`
        })
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'An error has ocurred deleting the Item'
      })
    }
  })
export default router