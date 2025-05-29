// app/api/reservations/route.test.ts

import { POST } from './route'
import getCurrentUser from '@/app/actions/GetCurrentUser'
import type { User as PrismaUser } from '@prisma/client'

jest.mock('@/app/libs/prismadb', () => ({
  __esModule: true,
  default: {
    listing: {
      update: jest.fn(),
    },
  },
}))

jest.mock('@/app/actions/GetCurrentUser')

describe('Reservations POST API (unit)', () => {
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

  it('POST creates a reservation successfully', async () => {
    const listingId = 'listing123'
    const startDate = '2025-06-01'
    const endDate = '2025-06-05'
    const totalPrice = 500

    // Mock do prisma.listing.update
    const mockResult = {
      id: listingId,
      /* aqui poderiam vir outros campos do listing */
      reservations: [{ id: 'res1', userId: baseUser.id, startDate, endDate, totalPrice }],
    }
    const { default: prisma } = await import('@/app/libs/prismadb')
    ;(prisma.listing.update as jest.Mock).mockResolvedValue(mockResult)

    const body = { listingId, startDate, endDate, totalPrice }
    const req = new Request('http://localhost/api/reservations', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })

    const res = await POST(req)
    expect(res).toBeInstanceOf(Response)
    const json = await (res as Response).json()
    expect(json).toEqual(mockResult)

    expect(prisma.listing.update).toHaveBeenCalledWith({
      where: { id: listingId },
      data: {
        reservations: {
          create: {
            userId: baseUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    })
  })

  it('POST returns error Response when not authenticated', async () => {
    ;(getCurrentUser as jest.Mock).mockResolvedValue(null)

    const body = { listingId: 'listing123', startDate: '2025-06-01', endDate: '2025-06-05', totalPrice: 500 }
    const req = new Request('http://localhost/api/reservations', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })

    const res = await POST(req)
    expect(res).toBeInstanceOf(Response)
    expect(res.status).toBe(0)
  })

  it('POST returns error Response when missing fields', async () => {
    // falha ao faltar qualquer campo
    const incompleteBodies = [
      { listingId: '', startDate: '2025-06-01', endDate: '2025-06-05', totalPrice: 500 },
      { listingId: 'listing123', startDate: '', endDate: '2025-06-05', totalPrice: 500 },
      { listingId: 'listing123', startDate: '2025-06-01', endDate: '', totalPrice: 500 },
      { listingId: 'listing123', startDate: '2025-06-01', endDate: '2025-06-05', totalPrice: 0 },
    ]

    const { default: prisma } = await import('@/app/libs/prismadb')
    for (const body of incompleteBodies) {
      ;(getCurrentUser as jest.Mock).mockResolvedValue(baseUser)
      const req = new Request('http://localhost/api/reservations', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
      const res = await POST(req)
      expect(res).toBeInstanceOf(Response)
      expect(res.status).toBe(0)
      expect(prisma.listing.update).not.toHaveBeenCalled()
    }
  })
})
