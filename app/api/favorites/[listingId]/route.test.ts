// app/api/favorites/[listingId]/route.test.ts

import { POST, DELETE } from './route'
import getCurrentUser from '@/app/actions/GetCurrentUser'
import type { User as PrismaUser } from '@prisma/client'

jest.mock('@/app/libs/prismadb', () => ({
  __esModule: true,
  default: {
    user: {
      update: jest.fn(),
    },
  },
}))
jest.mock('@/app/actions/GetCurrentUser')

describe('Favorites API (unit)', () => {
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

  it('POST adds a favorite and returns updated user', async () => {
    const listingId = 'listing123'
    const updatedUser = { ...baseUser, favoriteIds: [listingId] } as PrismaUser
    const { default: prisma } = await import('@/app/libs/prismadb')
    ;(prisma.user.update as jest.Mock).mockResolvedValue(updatedUser)

    const req = new Request(`http://localhost/api/favorites/${listingId}`, { method: 'POST' })
    const res = await POST(req, { params: Promise.resolve({ listingId }) })

    expect(res).toBeInstanceOf(Response)
    const json = await (res as Response).json()
    expect(json.favoriteIds).toEqual([listingId])
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: baseUser.id },
      data: { favoriteIds: [listingId] },
    })
  })

  it('DELETE removes a favorite and returns updated user', async () => {
    const listingId = 'listing123'
    const userWithFav = { ...baseUser, favoriteIds: [listingId] } as PrismaUser
    ;(getCurrentUser as jest.Mock).mockResolvedValue(userWithFav)

    const updatedUser = { ...baseUser, favoriteIds: [] } as PrismaUser
    const { default: prisma } = await import('@/app/libs/prismadb')
    ;(prisma.user.update as jest.Mock).mockResolvedValue(updatedUser)

    const req = new Request(`http://localhost/api/favorites/${listingId}`, { method: 'DELETE' })
    const res = await DELETE(req, { params: Promise.resolve({ listingId }) })

    expect(res).toBeInstanceOf(Response)
    const json = await (res as Response).json()
    expect(json.favoriteIds).toEqual([])
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: baseUser.id },
      data: { favoriteIds: [] },
    })
  })

  it('POST returns an error Response when not authenticated', async () => {
    ;(getCurrentUser as jest.Mock).mockResolvedValue(null)

    const req = new Request('http://localhost/api/favorites/any', { method: 'POST' })
    const res = await POST(req, { params: Promise.resolve({ listingId: 'any' }) })

    expect(res).toBeInstanceOf(Response)
    expect(res.status).toBe(0) // NextResponse.error() gera status 0
  })

  it('POST throws on missing ID (empty string)', async () => {
    const req = new Request('http://localhost/api/favorites/', { method: 'POST' })
    await expect(
      POST(req, { params: Promise.resolve({ listingId: '' }) })
    ).rejects.toThrow('Invalid ID')
  })

  it('DELETE throws on missing ID (empty string)', async () => {
    const req = new Request('http://localhost/api/favorites/', { method: 'DELETE' })
    await expect(
      DELETE(req, { params: Promise.resolve({ listingId: '' }) })
    ).rejects.toThrow('Invalid ID')
  })
})
