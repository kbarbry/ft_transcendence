import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from './user.service'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ExceptionTryingToUpdateID } from './exceptions/user.exceptions'
import { Prisma } from '@prisma/client'

describe('Test UserService', () => {
  let userService: UserService
  let prismaService: PrismaService
  let newUser: any
  let userData: Prisma.UserCreateInput

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService] // Incluez le PrismaService dans les providers
    }).compile()

    userService = module.get<UserService>(UserService)
    prismaService = module.get<PrismaService>(PrismaService)

    //**************************************************//
    //  MAKE IT CLEAN
    //**************************************************//

    await prismaService.$executeRaw`DELETE FROM "public"."RelationFriend";`
    await prismaService.$executeRaw`DELETE FROM "public"."RelationBlocked";`
    await prismaService.$executeRaw`DELETE FROM "public"."RelationRequests";`
    await prismaService.$executeRaw`DELETE FROM "public"."UserPresence";`
    await prismaService.$executeRaw`DELETE FROM "public"."GameStat";`
    await prismaService.$executeRaw`DELETE FROM "public"."Channel";`
    await prismaService.$executeRaw`DELETE FROM "public"."ChannelMember";`
    await prismaService.$executeRaw`DELETE FROM "public"."ChannelMessage";`
    await prismaService.$executeRaw`DELETE FROM "public"."PrivateMessage";`
    await prismaService.$executeRaw`DELETE FROM "public"."User";`
  })

  beforeEach(async () => {
    //**************************************************//
    //  MAKE IT CLEAN
    //**************************************************//

    await prismaService.$executeRaw`DELETE FROM "public"."User";`

    //**************************************************//
    //  USER CREATION
    //**************************************************//

    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('d2OayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('j6-X94_NVjmzVm9QL3k4r', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('_U0vTLhbNpjA39Pc7wwtn', 'random url', 'bob@42.fr', 'Bobby', 'Babby', null, null, false, 'Online', 'English', 1);`

    userData = {
      mail: 'CreateUser@example.com',
      username: 'CreateUser_user',
      password: 'password123',
      level: 0,
      avatarUrl: 'url'
    }
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
      newUser = await userService.create(userData)
      expect(newUser).toBeDefined()
    })

    it('should update an existing user', async () => {
      const updateUserData = {
        mail: 'updatedmail@exemple.com'
      }
      const updatedUser = await userService.update(
        'd2OayPlUh0qtDrePkJ87t',
        updateUserData
      )
      expect(updatedUser.mail).toStrictEqual(updateUserData.mail)
    })

    it('should delete an user', async () => {
      const deletedUser = await userService.delete('d2OayPlUh0qtDrePkJ87t')
      expect(deletedUser).toBeDefined()
    })
  })
  describe('Test Query', () => {
    it('should find user by id', async () => {
      const findUser = await userService.findOne('d2OayPlUh0qtDrePkJ87t')
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
    it('user already created - same mail', async () => {
      const userDataSameEmail = {
        mail: 'CreateUser@example.com',
        username: 'CreateUser_user2',
        password: 'password1234',
        level: 0,
        avatarUrl: 'url'
      }
      expect(async () => {
        await userService.create(userData)
        await userService.create(userDataSameEmail)
      }).rejects.toThrow(PrismaClientKnownRequestError)
    })
    it('user already created - same username', async () => {
      const userDataSameUsername = {
        mail: 'CreateUser2@example.com',
        username: 'CreateUser_user',
        password: 'password1234',
        level: 0,
        avatarUrl: 'url'
      }
      expect(async () => {
        await userService.create(userData)
        await userService.create(userDataSameUsername)
      }).rejects.toThrow(PrismaClientKnownRequestError)
    })
    it('change id field', async () => {
      expect(async () => {
        const updatedData = { id: '55555' }
        await userService.update('d2OayPlUh0qtDrePkJ87t', updatedData)
      }).rejects.toThrow(ExceptionTryingToUpdateID)
    })
    it('update already taken username', async () => {
      const updatedData = { username: 'Ally' }
      expect(async () => {
        newUser = await userService.update('j6-X94_NVjmzVm9QL3k4r', updatedData)
      }).rejects.toThrow(PrismaClientKnownRequestError)
    })
    it('update already taken email', async () => {
      const updatedData = { mail: 'alfred@42.fr' }
      expect(async () => {
        newUser = await userService.update('j6-X94_NVjmzVm9QL3k4r', updatedData)
      }).rejects.toThrow(PrismaClientKnownRequestError)
    })
    it('user already deleted', async () => {
      expect(async () => {
        await userService.delete('j6-X94_NVjmzVm9QL3k4r')
        await userService.delete('j6-X94_NVjmzVm9QL3k4r')
      }).rejects.toThrow(PrismaClientKnownRequestError)
    })
  })
})
