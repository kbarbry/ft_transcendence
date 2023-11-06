import { Test, TestingModule } from '@nestjs/testing'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { PrismaService } from '../prisma/prisma.service'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'
import { UpdateUserInput } from './dto/update-user.input'
import { ELanguage, EStatus } from '@prisma/client'

describe('UserResolver', () => {
  let userResolver: UserResolver
  const userService = {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn(),
    findOnebyMail: jest.fn(),
    findOneByUsername: jest.fn(),
    isUsernameUsed: jest.fn(),
    findUsersByUserIds: jest.fn()
  }
  let validationPipe: ValidationPipe

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        { provide: UserService, useValue: userService },
        PrismaService
      ]
    }).compile()

    userResolver = module.get<UserResolver>(UserResolver)
  })

  beforeEach(() => {
    validationPipe = new ValidationPipe()
    jest.clearAllMocks()
    userService.create.mockReset()
  })

  it('userResolver should be defined', () => {
    expect(userResolver).toBeDefined()
  })
  describe('Test Mutation', () => {
    it('updateUser', async () => {
      const data: UpdateUserInput = {
        username: 'dhaya2',
        avatarUrl: 'https://www.youtube.com/watch?v=dQw4w9Wgcac',
        status: EStatus.Idle,
        languages: ELanguage.French,
        level: 4
      }
      const resExpected = { id: '1', ...data }
      userService.update.mockReturnValue(resExpected)

      const result = await userResolver.updateUser('1', data)
      expect(result).toStrictEqual(resExpected)
      expect(userService.update).toHaveBeenCalledWith('1', data)
    })
    it('deleteUser', async () => {
      const resExpected = { id: '1' }
      userService.delete.mockReturnValue(resExpected)

      const result = await userResolver.deleteUser('1')
      expect(result).toStrictEqual(resExpected)
      expect(userService.delete).toHaveBeenCalledWith('1')
    })
  })

  describe('Test Query', () => {
    it('findOneUser', async () => {
      const resExpected = {
        id: '1',
        mail: 'dhaya@gmail.com',
        username: 'dhaya',
        avatarUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        status: EStatus.DoNotDisturb,
        languages: ELanguage.English,
        level: 3
      }
      userService.findOne.mockReturnValue(resExpected)

      const result = await userResolver.findOneUser('1')

      expect(result).toStrictEqual(resExpected)
      expect(userService.findOne).toHaveBeenCalledWith('1')
    })
    it('findOneUserbyMail', async () => {
      const resExpected = {
        id: '1',
        mail: 'dhaya@gmail.com',
        username: 'dhaya',
        avatarUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        status: EStatus.DoNotDisturb,
        languages: ELanguage.English,
        level: 3
      }
      userService.findOnebyMail.mockReturnValue(resExpected)

      const result = await userResolver.findOneUserbyMail('dhaya@gmail.com')

      expect(result).toStrictEqual(resExpected)
      expect(userService.findOnebyMail).toHaveBeenCalledWith('dhaya@gmail.com')
    })
    it('findOneUserByUsername', async () => {
      const resExpected = {
        id: '1',
        mail: 'dhaya@gmail.com',
        username: 'dhaya',
        avatarUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        status: EStatus.DoNotDisturb,
        languages: ELanguage.English,
        level: 3
      }
      userService.findOneByUsername.mockReturnValue(resExpected)

      const result = await userResolver.findOneUserByUsername('dhaya')

      expect(result).toStrictEqual(resExpected)
      expect(userService.findOneByUsername).toHaveBeenCalledWith('dhaya')
    })
    it('isUserUsernameUsed', async () => {
      userService.isUsernameUsed.mockReturnValue(true)

      const result = await userResolver.isUserUsernameUsed('dhaya')

      expect(result).toStrictEqual(true)
      expect(userService.isUsernameUsed).toHaveBeenCalledWith('dhaya')
    })
    it('findUsersByUserIds', async () => {
      const resExpected = [
        {
          id: '1',
          mail: 'dhaya@gmail.com',
          username: 'dhaya',
          avatarUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          status: EStatus.DoNotDisturb,
          languages: ELanguage.English,
          level: 3
        },
        {
          id: '3',
          mail: 'dhaya2@gmail.com',
          username: 'dhaya2',
          avatarUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          status: EStatus.DoNotDisturb,
          languages: ELanguage.English,
          level: 4
        },
        {
          id: '5',
          mail: 'dhaya3@gmail.com',
          username: 'dhaya3',
          avatarUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          status: EStatus.DoNotDisturb,
          languages: ELanguage.English,
          level: 5
        }
      ]
      userService.findUsersByUserIds.mockReturnValue(resExpected)

      const result = await userResolver.findUsersByUserIds(['1', '3', '5'])

      expect(result).toStrictEqual(resExpected)
      expect(userService.findUsersByUserIds).toHaveBeenCalledWith([
        '1',
        '3',
        '5'
      ])
    })
  })

  describe('Test ValidationPipe', () => {
    it('updateUser', async () => {
      const data = {
        username: 'dhaya',
        avatarUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        status: EStatus.DoNotDisturb,
        languages: ELanguage.English,
        level: 3
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: UpdateUserInput,
        data: ''
      }
      const response = await validationPipe.transform(data, metadata)
      expect(response).toStrictEqual(data)
    })
  })
})
