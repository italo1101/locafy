// app/api/register/route.test.ts

import bcrypt from 'bcrypt'
import { POST } from './route'
import prisma from '@/app/libs/prismadb'

// Mock do bcrypt e do prisma.user.create
jest.mock('bcrypt')
jest.mock('@/app/libs/prismadb', () => ({
  __esModule: true,
  default: {
    user: {
      create: jest.fn(),
    },
  },
}))

describe('Register API (unit)', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('POST creates a user with hashed password', async () => {
    const body = { email: 'test@example.com', name: 'Test User', password: 'secret' }
    const hashed = 'hashed-secret'
    ;(bcrypt.hash as jest.Mock).mockResolvedValue(hashed)

    const now = new Date().toISOString()
    const newUser = {
      id: 'user123',
      email: body.email,
      name: body.name,
      hashedPassword: hashed,
      emailVerified: null,
      image: null,
      createdAt: now,
      updatedAt: now,
      favoriteIds: [],
      accounts: [],
      listings: [],
      reservations: [],
    }
    ;(prisma.user.create as jest.Mock).mockResolvedValue(newUser)

    const req = new Request('http://localhost/api/register', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    expect(res).toBeInstanceOf(Response)

    const json = await (res as Response).json()
    expect(json).toEqual(newUser)

    expect(bcrypt.hash).toHaveBeenCalledWith(body.password, 12)
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email: body.email,
        name: body.name,
        hashedPassword: hashed,
      },
    })
  })
})
