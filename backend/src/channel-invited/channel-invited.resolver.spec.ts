import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { CreateChannelInvitedInput } from './dto/create-channel-invited.input'
import { ChannelInvitedResolver } from './channel-invited.resolver'
import { ChannelInvitedService } from './channel-invited.service'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'

describe('ChannelInvitedResolver', () => {
  let channelInvitedResolver: ChannelInvitedResolver
  const channelInvitedService = {
    create: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn(),
    findAllInChannel: jest.fn()
  }
  let validationPipe: ValidationPipe

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelInvitedResolver,
        {
          provide: ChannelInvitedService,
          useValue: channelInvitedService
        },
        PrismaService
      ]
    }).compile()

    channelInvitedResolver = module.get<ChannelInvitedResolver>(
      ChannelInvitedResolver
    )
  })

  beforeEach(async () => {
    validationPipe = new ValidationPipe()
    jest.clearAllMocks()
    channelInvitedService.create.mockReset()
  })

  it('should be defined', () => {
    expect(channelInvitedResolver).toBeDefined()
  })

  describe('Test Mutation', () => {
    it('createChannelInvited', async () => {
      const data: CreateChannelInvitedInput = {
        userId: '1',
        channelId: '2'
      }
      const resExpected = { id: '1', ...data }
      channelInvitedService.create.mockReturnValue(resExpected)

      const result = await channelInvitedResolver.createChannelInvited(data)

      expect(result).toStrictEqual(resExpected)
      expect(channelInvitedService.create).toHaveBeenCalledWith(data)
    })

    it('deleteChannelInvited', async () => {
      const resExpected = { id: '1' }
      channelInvitedService.delete.mockReturnValue(resExpected)

      const result = await channelInvitedResolver.deleteChannelInvited('1', '2')
      expect(result).toStrictEqual(resExpected)
      expect(channelInvitedService.delete).toHaveBeenCalledWith('1', '2')
    })
  })

  describe('Test Query', () => {
    it('findOneChannelInvited', async () => {
      const resExpected = {
        userId: '1',
        channelId: '2'
      }
      channelInvitedService.findOne.mockReturnValue(resExpected)

      const result = await channelInvitedResolver.findOneChannelInvited(
        '1',
        '2'
      )

      expect(result).toStrictEqual(resExpected)
      expect(channelInvitedService.findOne).toHaveBeenCalledWith('1', '2')
    })

    it('findAllChannelInvitedInChannel', async () => {
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
      channelInvitedService.findAllInChannel.mockReturnValue(resExpected)

      const result =
        await channelInvitedResolver.findAllChannelInvitedInChannel('1')

      expect(result).toStrictEqual(resExpected)
      expect(channelInvitedService.findAllInChannel).toHaveBeenCalledWith('1')
    })
  })

  describe('userId', () => {
    it('userId - invalid characters', async () => {
      const data = {
        userId: '765ayPlUh0qtDrePkJ87;',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: CreateChannelInvitedInput,
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
        metatype: CreateChannelInvitedInput,
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
        metatype: CreateChannelInvitedInput,
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
        metatype: CreateChannelInvitedInput,
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
        metatype: CreateChannelInvitedInput,
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
        channelId: 'pihayPlUh0qtDrePkJ87t',
        userId: null
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: CreateChannelInvitedInput,
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

  describe('channelId', () => {
    it('channelId - invalid characters', async () => {
      const data = {
        userId: 'pihayPlUh0qtDrePkJ87t',
        channelId: '765ayPlUh0qtDrePkJ87;'
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: CreateChannelInvitedInput,
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
        metatype: CreateChannelInvitedInput,
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
        metatype: CreateChannelInvitedInput,
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
        metatype: CreateChannelInvitedInput,
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
        metatype: CreateChannelInvitedInput,
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
        channelId: null,
        userId: 'pihayPlUh0qtDrePkJ87t'
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: CreateChannelInvitedInput,
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
