import { NextFunction, Request, Response } from 'express'
import { db } from '@/database/knex'
import { z } from 'zod'
import knex from 'knex'
import { AppError } from '@/utils/AppErros'

class OrdersController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number(),
      })

      const { table_session_id, product_id, quantity } = bodySchema.parse(
        req.body,
      )

      const session = await db<TablesSessionsRepository>('tables_sessions')
        .where({
          id: table_session_id,
        })
        .first()

      if (!session) {
        throw new AppError('sessions table not found')
      }

      if (session.closed_at) {
        throw new AppError('this table already closed')
      }

      const product = await db<ProductRepository>('products')
        .where({
          id: product_id,
        })
        .first()

      if (!product) {
        throw new AppError('product not found')
      }

      await db<OrderRepository>('orders').insert({
        table_session_id,
        product_id,
        quantity,
        price: product.price,
      })

      return res.status(201).json(product)
    } catch (error) {
      next(error)
    }
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { table_session_id } = req.params

      const order = await db('orders')
        .select(
          'orders.id',
          'orders.table_session_id',
          'orders.product_id',
          'products.name',
          'orders.price',
          'orders.quantity',
        )
        .join('products', 'products.id', ' orders.product_id')
        .where({ table_session_id })

      return res.json(order)
    } catch (error) {
      next(error)
    }
  }
}

export { OrdersController }
