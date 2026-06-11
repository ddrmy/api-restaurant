import { Request, Response, NextFunction } from 'express'

export class TablesSessionsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(201).json({ message: 'Ok!' })
    } catch (error) {
      next(error)
    }
  }
}
