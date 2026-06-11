import { Router } from 'express'
import { OrdersController } from '@/controllers/orders-controller'

export const ordersRoutes = Router()
const ordersController = new OrdersController()

ordersRoutes.post('/', ordersController.create)
