import { Request, Response, NextFunction } from 'express'

import { db } from '@/database/knex'

export class TablesController {
  async index(req: Request, res: Response, next: NextFunction) {
    const tables = await db<TableRepository>('tables')
      .select()
      .orderBy('table_number')

    return res.json(tables)
    try {
    } catch (error) {
      next(error)
    }
  }
}
