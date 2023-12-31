import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from './user.service'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { cleanDataBase } from '../../test/setup-environment'
import { UpdateUserInput } from './dto/update-user.input'

describe('Test UserService', () => {
  let userService: UserService
  let prismaService: PrismaService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService]
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
      ('d2OayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Ally', 'oui', false, false, false, false, 'Online', 'English', 1),
      ('j6-X94_NVjmzVm9QL3k4r', 'random url', 'charlie@42.fr', 'Chacha', 'oui', false, false, false, false, 'Invisble', 'French', 12),
      ('_U0vTLhbNpjA39Pc7wwtn', 'random url', 'bob@42.fr', 'Bobby', 'Babby', false, false, false, false, 'Online', 'English', 1),
      ('_smvTLhbNpjA39Pc7wwtn', 'random url', 'SameMail@example.com', 'SameUser', 'oui', false, false, false, false, 'Online', 'English', 1);`
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
    it('should update an existing user', async () => {
      const updateUserInput: UpdateUserInput = {
        username: 'Bob'
      }
      const updatedUser = await userService.update(
        'd2OayPlUh0qtDrePkJ87t',
        updateUserInput
      )
      expect(updatedUser.username).toStrictEqual(updateUserInput.username)
    })

    it('should delete an user', async () => {
      const deletedUser = await userService.delete('d2OayPlUh0qtDrePkJ87t')
      expect(deletedUser).toBeDefined()
    })
  })

  describe('Test Query', () => {
    it('should find user by id and return the user', async () => {
      const findUser = await userService.findOne('d2OayPlUh0qtDrePkJ87t')
      expect(findUser).toBeDefined()
    })

    it('should find user by id and return null', async () => {
      const findUser = await userService.findOne('invalid id')
      expect(findUser).toStrictEqual(null)
    })

    it('should find user by email and return the user', async () => {
      const findUser = await userService.findOnebyMail('charlie@42.fr')
      expect(findUser).toBeDefined()
    })

    it('should find user by email and return null', async () => {
      const findUser = await userService.findOnebyMail('invalid email')
      expect(findUser).toStrictEqual(null)
    })

    it('should find user by username and return the user', async () => {
      const findUser = await userService.findOneByUsername('Bobby')
      expect(findUser).toBeDefined()
    })

    it('should find user by username and return the user', async () => {
      const findUser = await userService.findOneByUsername(
        'Non existing Username'
      )
      expect(findUser).toStrictEqual(null)
    })

    it('should check if a user exist and return true', async () => {
      const bool = await userService.isUsernameUsed('Chacha')
      expect(bool).toStrictEqual(true)
    })

    it('should check if a user exist and return false', async () => {
      const bool = await userService.isUsernameUsed('UsernameNotTaken')
      expect(bool).toStrictEqual(false)
    })

    it('should return an array of user from userIds', async () => {
      const requestData: string[] = [
        'd2OayPlUh0qtDrePkJ87t',
        'j6-X94_NVjmzVm9QL3k4r',
        '_U0vTLhbNpjA39Pc7wwtn',
        '_smvTLhbNpjA39Pc7wwtn'
      ]
      const findUsers = await userService.findUsersByUserIds(requestData)
      expect(findUsers).toHaveLength(4)
    })

    it('should return an array of user from userIds - with one incorrect id', async () => {
      const requestData: string[] = [
        'd2OayPlUh0qtDrePkJ87t',
        'j6-X94_NVjmzVm9QL3k4r',
        '_U0vTLhbNpjA39Pc7wwtn',
        'lala'
      ]
      const findUsers = await userService.findUsersByUserIds(requestData)
      expect(findUsers).toHaveLength(3)
    })

    it('should return an array of user from userIds - with all incorrect id', async () => {
      const requestData: string[] = ['bebo', 'bubu', 'nono', 'lala']
      const findUsers = await userService.findUsersByUserIds(requestData)
      expect(findUsers).toHaveLength(0)
    })
  })

  describe('Test Error', () => {
    it('update already taken username and trow error', async () => {
      const updatedData: UpdateUserInput = {
        username: 'Ally'
      }
      await expect(
        userService.update('j6-X94_NVjmzVm9QL3k4r', updatedData)
      ).rejects.toThrow(PrismaClientKnownRequestError)
    })

    it('deleted non existing user and throw error', async () => {
      await expect(userService.delete('j12X94_NVjmzVm9QL3k4r')).rejects.toThrow(
        PrismaClientKnownRequestError
      )
    })
  })
})
