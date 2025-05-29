// app/api/listings/[listingId]/route.test.ts

import { DELETE } from './route'
import getCurrentUser from '@/app/actions/GetCurrentUser'
import type { User as PrismaUser } from '@prisma/client'

// Mock manual do prisma.listing.deleteMany
jest.mock('@/app/libs/prismadb', () => ({
  __esModule: true,
  default: {
    listing: {
      deleteMany: jest.fn(),
    },
  },
}))

jest.mock('@/app/actions/GetCurrentUser')

describe('Listings DELETE API (unit)', () => {
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

  it('DELETE removes a listing and returns count', async () => {
    const listingId = 'listing123'
    const deleteResult = { count: 1 }
    const { default: prisma } = await import('@/app/libs/prismadb')
    ;(prisma.listing.deleteMany as jest.Mock).mockResolvedValue(deleteResult)

    const req = new Request(`http://localhost/api/listings/${listingId}`, { method: 'DELETE' })
    const res = await DELETE(req, { params: Promise.resolve({ listingId }) })

    expect(res).toBeInstanceOf(Response)
    const json = await (res as Response).json()
    expect(json).toEqual(deleteResult)
    expect(prisma.listing.deleteMany).toHaveBeenCalledWith({
      where: { id: listingId, userId: baseUser.id },
    })
  })

  it('DELETE returns error Response when not authenticated', async () => {
    ;(getCurrentUser as jest.Mock).mockResolvedValue(null)

    const req = new Request('http://localhost/api/listings/any', { method: 'DELETE' })
    const res = await DELETE(req, { params: Promise.resolve({ listingId: 'any' }) })

    // NextResponse.error() gera status 0
    expect(res).toBeInstanceOf(Response)
    expect(res.status).toBe(0)
  })

  it('DELETE throws on missing ID (empty string)', async () => {
    const req = new Request('http://localhost/api/listings/', { method: 'DELETE' })
    await expect(
      DELETE(req, { params: Promise.resolve({ listingId: '' }) })
    ).rejects.toThrow('Invalid ID')
  })
})
