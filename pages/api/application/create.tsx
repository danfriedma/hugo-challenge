import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// POST /api/application/create
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    id,
    addressId,
    ...application
  } = req.body

  const result = await prisma.application.create({
    data: {
      ...application,
      address: {
        create: application.address
      },
      vehicles: {
        create: application.vehicles
      },
      people: {
        create: application.people
      }
    }
  })

  return res.status(201).json({
    status: 'OK',
    data: result,
    resume: `application/${result.id}`
  })
}
