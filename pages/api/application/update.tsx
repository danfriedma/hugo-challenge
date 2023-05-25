import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const upsert = (items) => {
  if(items == []) return []

  const format = (item) => {
    const { id, ...rest } = item

    return {
      create: rest,
      update: rest,
      where: {
        id: id || ''
      }
    }
  }

  return items.length == 1 ?
    format(items[0]) :
    items.map(format)
}

// PUT /api/application/update
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {addressId, ...application} = req.body
  const {id, ...address} = application.address


  const result = await prisma.application.update({
    where: {
      id: application.id
    },
    data: {
      ...application,
      address: {
        update: application.address
      },
      vehicles: {
        upsert: upsert(application.vehicles)
      },
      people: {
        upsert: upsert(application.people)
      },
    },
    include: {
      address: true,
      people: true,
      vehicles: true
    }
  })
  return res.status(200).json({
    status: 'OK',
    data: result
  })
}
