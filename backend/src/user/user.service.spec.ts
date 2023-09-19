import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from './user.service'
import { Prisma } from '@prisma/client'

describe('Test UserService', () => {
  let userService: UserService
  let prismaService: PrismaService
  let userData: any
  let newUser: any

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService] // Incluez le PrismaService dans les providers
    }).compile()

    userService = module.get<UserService>(UserService)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  beforeEach(async () => {
    //await prismaService.$executeRaw`DELETE FROM "public"."User";`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('51d43c2', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('4ee771a', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('807e588', 'random url', 'bob@42.fr', 'Bobby', 'Babby', null, null, false, 'Online', 'English', 1);`
    // await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('3fc7224', 'random url', 'david@42.fr', 'dav', 'oui', null, null, false, 'Invisble', 'French', 12);`
    // await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('a5cfce0', 'random url', 'evan@42.fr', 'evee', 'oui', null, null, false, 'Idle', 'Spanish', 36);`
    // await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('f568b3a', 'random url', 'frank@42.fr', 'punisher', 'oui', null, null, false, 'DoNotDisturb', 'Spanish', 9000);`
  })

  afterEach(async () => {
    await prismaService.user.deleteMany({})
  })

  afterAll(async () => {
    await prismaService.$disconnect()
  })

  it('userService should be defined', () => {
    expect(userService).toBeDefined()
  })
  it('prismaService should be defined', () => {
    expect(prismaService).toBeDefined()
  })

  describe('Test Mutations', () => {
    it('should create a new user', async () => {
      const userData = {
        mail: 'CreateUser@example.com',
        username: 'CreateUser_user',
        password: 'password123',
        level: 0,
        avatarUrl: 'url'
      }
      newUser = await userService.create(userData)
      expect(newUser).toBeDefined()
    })

    it('should update an existing user', async () => {
      const updateUserData = {
        mail: 'updatedmail@exemple.com'
      }
      const updatedUser = await userService.update('51d43c2', updateUserData)
      expect(updatedUser.mail).toStrictEqual(updateUserData.mail)
    })

    it('should delete an user', async () => {
      const deletedUser = await userService.delete('51d43c2')
      expect(deletedUser).toBeDefined()
    })
  })
  describe('Test Query', () => {
    it('should find user by id', async () => {
      const findUser = await userService.findOne('51d43c2')
      expect(findUser).toBeDefined()
    })
    it('should find user by email', async () => {
      const findUser = await userService.findOnebyMail('charlie@42.fr')
      expect(findUser).toBeDefined()
    })
    it('should find user by username', async () => {
      const findUser = await userService.findOneByUsername('Bobby')
      expect(findUser).toBeDefined()
    })
  })
  describe('Test Error', () => {
    it('user already created', async () => {
      expect(async () => {
        const userData = {
          mail: 'CreateUser@example.com',
          username: 'CreateUser_user',
          password: 'password123',
          level: 0,
          avatarUrl: 'url'
        }
        newUser = await userService.create(userData)
        newUser = await userService.create(userData)
      }).rejects.toThrow()
    })
  })
})
