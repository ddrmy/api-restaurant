import { db } from '@/database/knex'
import { AppError } from '@/utils/AppErros'
import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export class TablesSessionsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number(),
      })

      const { table_id } = bodySchema.parse(req.body)

      const session = await db<TablesSessionsRepository>('tables_sessions')
        .where({ table_id })
        .orderBy('opened_at', 'desc')
        .first()

      if (session && !session.closed_at) {
        throw new AppError('this table is already open')
      }

      await db<TablesSessionsRepository>('tables_sessions').insert({
        table_id,
        opened_at: db.fn.now(),
      })

      return res.status(201).json()
    } catch (error) {
      next(error)
    }
  }
}
