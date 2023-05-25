import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET /api/application/[id]
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await prisma.application.findUnique({
    where: {
      id: req.query.id as string,
    },
    include: {
      address: true,
      people: true,
      vehicles: true
    }
  })

  return res.status(200).json(result)
}
