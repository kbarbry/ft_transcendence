import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from './user.service'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ExceptionTryingToUpdateID } from './exceptions/user.exceptions'
import { Prisma } from '@prisma/client'
import { cleanDataBase } from '../../test/setup-environment'

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
  })

  beforeEach(async () => {
    //**************************************************//
    //  MAKE IT CLEAN
    //**************************************************//
    await cleanDataBase(prismaService)

    //**************************************************//
    //  USER CREATION
    //**************************************************//
    await prismaService.$executeRaw`
    INSERT INTO
    "public"."User"
    VALUES
    ('d2OayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1),
    ('j6-X94_NVjmzVm9QL3k4r', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12),
    ('_U0vTLhbNpjA39Pc7wwtn', 'random url', 'bob@42.fr', 'Bobby', 'Babby', null, null, false, 'Online', 'English', 1),
    ('_smvTLhbNpjA39Pc7wwtn', 'random url', 'SameMail@example.com', 'SameUser', 'oui', null, null, false, 'Online', 'English', 1);`

    userData = {
      mail: 'CreateUser@example.com',
      username: 'CreateUser_user',
      password: 'password123',
      level: 0,
      avatarUrl: 'url'
    }
  })

  afterAll(async () => {
    await cleanDataBase(prismaService)
    await prismaService.$disconnect()
  })

  it('userService should be defined', () => {
    expect(userService).toBeDefined()
  })
  it('prismaService should be defined', () => {
    expect(prismaService).toBeDefined()
  })

  describe('Test Mutation', () => {
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
        mail: 'SameMail@example.com',
        username: 'NoteSameUser',
        level: 0,
        avatarUrl: 'random url'
      }
      await expect(userService.create(userDataSameEmail)).rejects.toThrow(
        PrismaClientKnownRequestError
      )
    })

    it('user already created - same username', async () => {
      const userDataSameUsername = {
        mail: 'NotSameMail@example.com',
        username: 'SameUser',
        level: 0,
        avatarUrl: 'random url'
      }
      await expect(userService.create(userDataSameUsername)).rejects.toThrow(
        PrismaClientKnownRequestError
      )
    })

    it('change id field', async () => {
      const updatedData = { id: '55555' }
      await expect(
        userService.update('d2OayPlUh0qtDrePkJ87t', updatedData)
      ).rejects.toThrow(ExceptionTryingToUpdateID)
    })

    it('update already taken username', async () => {
      const updatedData = { username: 'Ally' }
      await expect(
        (newUser = userService.update('j6-X94_NVjmzVm9QL3k4r', updatedData))
      ).rejects.toThrow(PrismaClientKnownRequestError)
    })

    it('update already taken email', async () => {
      const updatedData = { mail: 'alfred@42.fr' }
      await expect(
        (newUser = userService.update('j6-X94_NVjmzVm9QL3k4r', updatedData))
      ).rejects.toThrow(PrismaClientKnownRequestError)
    })

    it('user already deleted', async () => {
      await expect(userService.delete('j12X94_NVjmzVm9QL3k4r')).rejects.toThrow(
        PrismaClientKnownRequestError
      )
    })
  })
})
