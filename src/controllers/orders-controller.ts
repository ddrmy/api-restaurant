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

      return res.status(201).json()
    } catch (error) {
      next(error)
    }
  }
}

export { OrdersController }
