import { Test, TestingModule } from '@nestjs/testing'
import { ChannelBlockedResolver } from './channel-blocked.resolver'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'
import { CreateChannelBlockedInput } from './dto/create-channel-blocked.input'
import { ChannelBlockedService } from './channel-blocked.service'
import { PrismaService } from '../prisma/prisma.service'

describe('ChannelBlockedResolver', () => {
  let channelBlockedResolver: ChannelBlockedResolver
  const channelBlockedService = {
    create: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn(),
    findAllInChannel: jest.fn()
  }
  let validationPipe: ValidationPipe

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelBlockedResolver,
        { provide: ChannelBlockedService, useValue: channelBlockedService },
        PrismaService
      ]
    }).compile()

    channelBlockedResolver = module.get<ChannelBlockedResolver>(
      ChannelBlockedResolver
    )
  })

  beforeEach(async () => {
    validationPipe = new ValidationPipe()
    jest.clearAllMocks()
    channelBlockedService.create.mockReset()
  })

  it('should be defined', () => {
    expect(channelBlockedResolver).toBeDefined()
  })

  describe('Test Mutation', () => {
    it('createRelationRequests', async () => {
      const data: CreateChannelBlockedInput = {
        userId: '1',
        channelId: '2'
      }
      const resExpected = { id: '1', ...data }
      channelBlockedService.create.mockReturnValue(resExpected)

      const result = await channelBlockedResolver.createChannelBlocked(data)

      expect(result).toStrictEqual(resExpected)
      expect(channelBlockedService.create).toHaveBeenCalledWith(data)
    })

    it('deleteRelationRequests', async () => {
      const resExpected = { id: '1' }
      channelBlockedService.delete.mockReturnValue(resExpected)

      const result = await channelBlockedResolver.deleteChannelBlocked('1', '2')
      expect(result).toStrictEqual(resExpected)
      expect(channelBlockedService.delete).toHaveBeenCalledWith('1', '2')
    })
  })

  describe('Test Query', () => {
    it('findOneRelationRequests', async () => {
      const resExpected = {
        userId: '1',
        channelId: '2'
      }
      channelBlockedService.findOne.mockReturnValue(resExpected)

      const result = await channelBlockedResolver.findOneChannelBlocked(
        '1',
        '2'
      )

      expect(result).toStrictEqual(resExpected)
      expect(channelBlockedService.findOne).toHaveBeenCalledWith('1', '2')
    })

    it('findAllInChannelBlocked', async () => {
      const resExpected = [
        {
          userId: '1',
          channelId: '2'
        },
        {
          userId: '1',
          channelId: '3'
        }
      ]
      channelBlockedService.findAllInChannel.mockReturnValue(resExpected)

      const result = await channelBlockedResolver.findAllInChannelBlocked('1')

      expect(result).toStrictEqual(resExpected)
      expect(channelBlockedService.findAllInChannel).toHaveBeenCalledWith('1')
    })
  })

  describe('Test ValidationPipe', () => {
    it('createChannelBlocked', async () => {
      const data = {
        userId: '765ayPlUh0qtDrePkJ87t',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: CreateChannelBlockedInput,
        data: ''
      }
      const response = await validationPipe.transform(data, metadata)
      expect(response).toStrictEqual(data)
    })
  })

  describe('Test Error', () => {
    describe('UserId - nanoid tests (mandatory)', () => {
      it('userId - invalid characters', async () => {
        const data = {
          userId: '765ayPlUh0qtDrePkJ87;',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelBlockedInput,
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

      it('userId - too short', async () => {
        const data = {
          userId: '765ayPlUh0qtDrePkJ87',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelBlockedInput,
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

      it('userId - too long', async () => {
        const data = {
          userId: '765ayPlUh0qtDrePkJ87tt',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelBlockedInput,
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

      it('userId - invalid type', async () => {
        const data = {
          userId: 75,
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelBlockedInput,
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

      it('userId - undefined', async () => {
        const data = {
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelBlockedInput,
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

      it('userId - null', async () => {
        const data = {
          userId: null,
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelBlockedInput,
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
    })

    describe('channelId - nanoid tests (mandatory)', () => {
      it('channelId - invalid characters', async () => {
        const data = {
          userId: 'pihayPlUh0qtDrePkJ87t',
          channelId: '765ayPlUh0qtDrePkJ87;'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelBlockedInput,
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

      it('channelId - too short', async () => {
        const data = {
          userId: 'pihayPlUh0qtDrePkJ87t',
          channelId: '765ayPlUh0qtDrePkJ87'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelBlockedInput,
          data: ''
        }
        const res = {
          message: ['channelId must be exactly 21 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('channelId - too long', async () => {
        const data = {
          userId: 'pihayPlUh0qtDrePkJ87t',
          channelId: '765ayPlUh0qtDrePkJ87tt'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelBlockedInput,
          data: ''
        }
        const res = {
          message: ['channelId must be exactly 21 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('channelId - invalid type', async () => {
        const data = {
          userId: 'pihayPlUh0qtDrePkJ87t',
          channelId: 75
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelBlockedInput,
          data: ''
        }
        const res = {
          message: [
            'channelId must be exactly 21 characters long.',
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

      it('channelId - undefined', async () => {
        const data = {
          userId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelBlockedInput,
          data: ''
        }
        const res = {
          message: [
            'channelId must be exactly 21 characters long.',
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

      it('channelId - null', async () => {
        const data = {
          userId: 'pihayPlUh0qtDrePkJ87t',
          channelId: null
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelBlockedInput,
          data: ''
        }
        const res = {
          message: [
            'channelId must be exactly 21 characters long.',
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
    })
  })
})
