import { Test, TestingModule } from '@nestjs/testing'
import { UserPresenceResolver } from './user-presence.resolver'
import { UserPresenceService } from './user-presence.service'
import { PrismaService } from '../prisma/prisma.service'
import { UserPresenceCreateInput } from './dto/create-user-presence.input'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'

describe('UserPresenceResolver', () => {
  let userPresenceResolver: UserPresenceResolver
  const userPresenceService = {
    create: jest.fn(),
    disconnected: jest.fn(),
    isConnected: jest.fn(),
    findOne: jest.fn(),
    findLastByUserId: jest.fn(),
    findAllByUserId: jest.fn()
  }
  let validationPipe: ValidationPipe

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPresenceResolver,
        {
          provide: UserPresenceService,
          useValue: userPresenceService
        },
        PrismaService
      ]
    }).compile()
    userPresenceResolver =
      module.get<UserPresenceResolver>(UserPresenceResolver)
  })
  beforeEach(async () => {
    validationPipe = new ValidationPipe()
    jest.clearAllMocks()
    userPresenceService.create.mockReset()
  })

  it('userPresence resolver should be defined', () => {
    expect(userPresenceResolver).toBeDefined()
  })

  describe('Test Mutation', () => {
    it('createUserPresence', async () => {
      const data: UserPresenceCreateInput = {
        userId: '01'
      }
      const resExpected = { id: '01', ...data }
      userPresenceService.create.mockReturnValue(resExpected)

      const result = await userPresenceResolver.createUserPresence(data)

      expect(result).toStrictEqual(resExpected)
      expect(userPresenceService.create).toHaveBeenCalledWith(data)
    })
    it('disconnected', async () => {
      const resExpected = { id: '01' }
      userPresenceService.disconnected.mockReturnValue(resExpected)
      const res = await userPresenceResolver.disconnectedUserPresence('01')
      expect(res).toStrictEqual(resExpected)
      expect(userPresenceService.disconnected).toHaveBeenCalledWith('01')
    })
  })

  describe('Test Query', () => {
    it('findOneUserPresence', async () => {
      const resExpected = {
        id: '01'
      }
      userPresenceService.findOne.mockReturnValue(resExpected)

      const result = await userPresenceResolver.findOneUserPresence('01')

      expect(result).toStrictEqual(resExpected)
      expect(userPresenceService.findOne).toHaveBeenCalledWith('01')
    })
    it('findLastUserPresenceByUserId', async () => {
      const resExpected = {
        id: '01'
      }
      userPresenceService.findLastByUserId.mockReturnValue(resExpected)

      const result = await userPresenceResolver.findLastUserPresenceByUserId(
        '01'
      )

      expect(result).toStrictEqual(resExpected)
      expect(userPresenceService.findLastByUserId).toHaveBeenCalledWith('01')
    })
    it('findAllUserPresenceByUserId', async () => {
      const resExpected = {
        id: '01'
      }
      userPresenceService.findAllByUserId.mockReturnValue(resExpected)

      const result = await userPresenceResolver.findAllUserPresenceByUserId(
        '01'
      )

      expect(result).toStrictEqual(resExpected)
      expect(userPresenceService.findAllByUserId).toHaveBeenCalledWith('01')
    })
    //////////////////
    it('isUserPresenceConnected', async () => {
      userPresenceService.isConnected.mockReturnValue(true)
      const res = await userPresenceResolver.isUserPresenceConnected('01')
      expect(res).toStrictEqual(true)
      expect(userPresenceService.isConnected).toHaveBeenCalledWith('01')
    })
  })

  describe('Test Error', () => {
    describe('userId - nanoid tests (mandatory)', () => {
      it('invalid nanoid - empty id', async () => {
        const data = {}

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: UserPresenceCreateInput,
          data: ''
        }
        const res = {
          message: [
            'userId must be exactly 21 characters long.',
            'Invalid nanoid characters.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid nanoid - null nanoId', async () => {
        const data = {
          userId: null
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: UserPresenceCreateInput,
          data: ''
        }
        const res = {
          message: [
            'userId must be exactly 21 characters long.',
            'Invalid nanoid characters.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('too short nanoid', async () => {
        const data = {
          userId: 'drfOayPww2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: UserPresenceCreateInput,
          data: ''
        }
        const res = {
          message: ['userId must be exactly 21 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('too long nanoid', async () => {
        const data = {
          userId: 'drfOayPww2qqtDrePkqqqwJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: UserPresenceCreateInput,
          data: ''
        }
        const res = {
          message: ['userId must be exactly 21 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid char in nanoid', async () => {
        const data = {
          userId: 'drfOayPww 2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: UserPresenceCreateInput,
          data: ''
        }
        const res = {
          message: ['Invalid nanoid characters.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
    })
  })
})
//check with invalid user
// check with invalid ID (lenght or ivanlid char)
// check userpresence creation
// disconnected at working
// FindOne working
// all methods working
