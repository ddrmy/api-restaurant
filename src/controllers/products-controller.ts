import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export class ProductController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({ message: 'OK' })
    } catch (error) {
      next(error)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string({ required_error: 'name is required!' }).trim().min(6),
        price: z.number().gt(0, { message: 'value must be greater than 0' }),
      })

      const { name, price } = bodySchema.parse(req.body)

      return res.status(201).json({ name, price })
    } catch (error) {
      next(error)
    }
  }
}
