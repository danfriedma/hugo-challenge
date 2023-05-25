import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import schema from '../../../prisma/schema.js'

const validate = (obj) => {
  return schema.safeParse(obj)
}

// GET /api/application/validate
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await prisma.application.findUnique({
    where: {
      id: req.body.id
    },
    include: {
      address: true,
      people: true,
      vehicles: true
    }
  })
  const validation = validate(result)

  return validation.success ?
    res.status(200).json({
      status: 'OK',
      price: (Math.random()*100).toFixed(2)
    }) :
    res.status(400)
}
