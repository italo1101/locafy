// app/api/reservations/[reservationId]/route.test.ts

import { DELETE } from './route'
import getCurrentUser from '@/app/actions/GetCurrentUser'
import type { User as PrismaUser } from '@prisma/client'

// Mock manual do prisma.reservation.deleteMany
jest.mock('@/app/libs/prismadb', () => ({
  __esModule: true,
  default: {
    reservation: {
      deleteMany: jest.fn(),
    },
  },
}))

jest.mock('@/app/actions/GetCurrentUser')

describe('Reservations DELETE API (unit)', () => {
  const baseUser = {
    id: 'user123',
    name: null,
    email: null,
    emailVerified: null,
    image: null,
    hashedPassword: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    favoriteIds: [] as string[],
    accounts: [],
    listings: [],
    reservations: [],
  } as PrismaUser

  beforeEach(() => {
    jest.clearAllMocks()
    ;(getCurrentUser as jest.Mock).mockResolvedValue(baseUser)
  })

  it('DELETE deletes the reservation and returns count on success', async () => {
    const reservationId = 'res123'
    const deleteResult = { count: 1 }
    const { default: prisma } = await import('@/app/libs/prismadb')
    ;(prisma.reservation.deleteMany as jest.Mock).mockResolvedValue(deleteResult)

    const req = new Request(`http://localhost/api/reservations/${reservationId}`, {
      method: 'DELETE',
    })
    const res = await DELETE(req)

    expect(res).toBeInstanceOf(Response)
    expect(res.status).toBe(200)
    const json = await (res as Response).json()
    expect(json).toEqual(deleteResult)
    expect(prisma.reservation.deleteMany).toHaveBeenCalledWith({
      where: {
        id: reservationId,
        OR: [
          { userId: baseUser.id },
          { listing: { userId: baseUser.id } },
        ],
      },
    })
  })

  it('DELETE returns 401 when not authenticated', async () => {
    ;(getCurrentUser as jest.Mock).mockResolvedValue(null)

    const req = new Request('http://localhost/api/reservations/any', {
      method: 'DELETE',
    })
    const res = await DELETE(req)

    expect(res).toBeInstanceOf(Response)
    expect(res.status).toBe(401)
    const json = await (res as Response).json()
    expect(json).toEqual({ error: 'Unauthorized' })
  })

  it('DELETE returns 400 on missing reservationId', async () => {
    const req = new Request('http://localhost/api/reservations/', {
      method: 'DELETE',
    })
    const res = await DELETE(req)

    expect(res).toBeInstanceOf(Response)
    expect(res.status).toBe(400)
    const json = await (res as Response).json()
    expect(json).toEqual({ error: 'Invalid reservation ID' })
  })

  it('DELETE returns 500 on internal error', async () => {
    const reservationId = 'res123'
    // Simula erro interno no prisma
    const { default: prisma } = await import('@/app/libs/prismadb')
    ;(prisma.reservation.deleteMany as jest.Mock).mockRejectedValue(new Error('fail'))

    const req = new Request(`http://localhost/api/reservations/${reservationId}`, {
      method: 'DELETE',
    })
    const res = await DELETE(req)

    expect(res).toBeInstanceOf(Response)
    expect(res.status).toBe(500)
    const json = await (res as Response).json()
    expect(json).toEqual({ error: 'Internal Server Error' })
  })
})
