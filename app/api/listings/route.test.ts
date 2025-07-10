// app/api/listings/route.test.ts

import { POST } from './route'
import getCurrentUser from '@/app/actions/GetCurrentUser'
import type { User as PrismaUser } from '@prisma/client'

jest.mock('@/app/libs/prismadb', () => ({
  __esModule: true,
  default: {
    listing: {
      create: jest.fn(),
    },
  },
}))
jest.mock('@/app/actions/GetCurrentUser')

describe('Listings POST API (unit)', () => {
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

  it('POST creates a listing successfully', async () => {
    // Use ISO strings para o JSON
    const now = new Date().toISOString()
    const newListing = {
      id: 'listing123',
      title: 'Test',
      description: 'Desc',
      imageSrc: 'img.jpg',
      category: 'house',
      guestCount: 4,
      roomCount: 2,
      wifiCount: 1,
      bathroomCount: 1,
      acCount: 1,
      locationValue: 'NY',
      price: 100,
      userId: baseUser.id,
      createdAt: now,
      updatedAt: now,
    }
    const { default: prisma } = await import('@/app/libs/prismadb')
    ;(prisma.listing.create as jest.Mock).mockResolvedValue(newListing)

    const body = {
      title: 'Test',
      description: 'Desc',
      imageSrc: 'img.jpg',
      category: 'house',
      guestCount: 4,
      roomCount: 2,
      wifiCount: 1,
      bathroomCount: 1,
      acCount: 1,
      location: { value: 'NY' },
      price: '100',
    }
    const req = new Request('http://localhost/api/listings', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)

    expect(res).toBeInstanceOf(Response)
    const json = await (res as Response).json()
    expect(json).toEqual(newListing)
    expect(prisma.listing.create).toHaveBeenCalledWith({
      data: {
        title: body.title,
        description: body.description,
        imageSrc: body.imageSrc,
        category: body.category,
        guestCount: body.guestCount,
        roomCount: body.roomCount,
        wifiCount: body.wifiCount,
        bathroomCount: body.bathroomCount,
        acCount: body.acCount,
        locationValue: body.location.value,
        price: parseInt(body.price, 10),
        userId: baseUser.id,
      },
    })
  })

  it('POST returns error Response when not authenticated', async () => {
    ;(getCurrentUser as jest.Mock).mockResolvedValue(null)

    const body = {
      title: 'Test',
      description: 'Desc',
      imageSrc: 'img.jpg',
      category: 'house',
      guestCount: 4,
      roomCount: 2,
      wifiCount: 1,
      bathroomCount: 1,
      acCount: 1,
      location: { value: 'NY' },
      price: '100',
    }
    const req = new Request('http://localhost/api/listings', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)

    expect(res).toBeInstanceOf(Response)
    expect(res.status).toBe(0) // NextResponse.error() produz 0
  })

  it('POST throws when a field is empty', async () => {
    const body = {
      title: '', // campo vazio
      description: 'Desc',
      imageSrc: 'img.jpg',
      category: 'house',
      guestCount: 4,
      roomCount: 2,
      wifiCount: 1,
      bathroomCount: 1,
      acCount: 1,
      location: { value: 'NY' },
      price: '100',
    }
    const req = new Request('http://localhost/api/listings', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })

    await expect(POST(req)).rejects.toThrow('O campo title está vazio.')
  })
})
