import { Test, TestingModule } from '@nestjs/testing'
import { ChannelBlockedResolver } from './channel-blocked.resolver'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'
import { CreateChannelBlockedInput } from './dto/create-channel-blocked.input'
import { ChannelBlockedService } from './channel-blocked.service'
import { PrismaService } from '../prisma/prisma.service'

describe('ChannelBlockedResolver', () => {
  let resolver: ChannelBlockedResolver
  const validationPipe = new ValidationPipe()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelBlockedResolver, ChannelBlockedService, PrismaService]
    }).compile()

    resolver = module.get<ChannelBlockedResolver>(ChannelBlockedResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
  describe('Bad UserId', () => {
    it('Bad UserId - bad characters', async () => {
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

    it('Bad UserId - too short', async () => {
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

    it('Bad UserId - too long', async () => {
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

    it('Bad UserId - wrong type', async () => {
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

    it('Bad UserId - undefined', async () => {
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
  })

  describe('Bad ChannelId', () => {
    it('Bad ChannelId - bad characters', async () => {
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

    it('Bad ChannelId - too short', async () => {
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

    it('Bad ChannelId - too long', async () => {
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

    it('Bad ChannelId - wrong type', async () => {
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

    it('Bad ChannelId - undefined', async () => {
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
  })
})
