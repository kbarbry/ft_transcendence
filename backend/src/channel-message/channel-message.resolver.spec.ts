import { Test, TestingModule } from '@nestjs/testing'
import { ChannelMessageResolver } from './channel-message.resolver'
import { ChannelMessageService } from './channel-message.service'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'
import { CreateChannelMessageInput } from './dto/create-channel-message.input'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateChannelMessageInput } from './dto/update-channel-message.input'

describe('UserResolver', () => {
  let channelMessageResolver: ChannelMessageResolver
  const channelMessageService = {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn(),
    findAllInChannel: jest.fn(),
    findAllInChannelByUser: jest.fn(),
    findAllThatContain: jest.fn()
  }
  let validationPipe: ValidationPipe

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelMessageResolver,
        { provide: ChannelMessageService, useValue: channelMessageService },
        PrismaService
      ]
    }).compile()

    channelMessageResolver = module.get<ChannelMessageResolver>(
      ChannelMessageResolver
    )
  })

  beforeEach(async () => {
    validationPipe = new ValidationPipe()
    jest.clearAllMocks()
    channelMessageService.create.mockReset()
  })

  it('should be defined', () => {
    expect(channelMessageResolver).toBeDefined()
  })

  describe('Test Mutation', () => {
    it('createChannelMessage', async () => {
      const data: CreateChannelMessageInput = {
        content: 'Simple message',
        senderId: '765ayPlUh0qtDrePkJ87t',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }
      const resExpected = { id: 1, ...data }

      channelMessageService.create.mockReturnValue(resExpected)
      const result = await channelMessageResolver.createChannelMessage(data)

      expect(result).toStrictEqual(resExpected)
      expect(channelMessageService.create).toHaveBeenCalledWith(data)
    })

    it('updateChannelMessage', async () => {
      const data: UpdateChannelMessageInput = {
        content: 'Simple message'
      }
      const resExpected = { id: 1, ...data }

      channelMessageService.update.mockReturnValue(resExpected)
      const result = await channelMessageResolver.updateChannelMessage(
        '1',
        data
      )

      expect(result).toStrictEqual(resExpected)
      expect(channelMessageService.update).toHaveBeenCalledWith('1', data)
    })

    it('deleteChannelMessage', async () => {
      const resExpected = {
        id: '1',
        content: 'Simple message',
        senderId: '765ayPlUh0qtDrePkJ87t',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }

      channelMessageService.delete.mockReturnValue(resExpected)
      const result = await channelMessageResolver.deleteChannelMessage('1')

      expect(result).toStrictEqual(resExpected)
      expect(channelMessageService.delete).toHaveBeenCalledWith('1')
    })
  })

  describe('Test Query', () => {
    it('findOneChannelMessage', async () => {
      const resExpected = {
        id: '1',
        content: 'Simple message',
        senderId: '765ayPlUh0qtDrePkJ87t',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }

      channelMessageService.findOne.mockReturnValue(resExpected)
      const result = await channelMessageResolver.findOneChannelMessage('1')

      expect(result).toStrictEqual(resExpected)
      expect(channelMessageService.findOne).toHaveBeenCalledWith('1')
    })

    it('findAllChannelMessageInChannel', async () => {
      const resExpected = [
        {
          id: '1',
          content: 'Simple message 1',
          senderId: '765ayPlUh0qtDrePkJ87t',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        },
        {
          id: '2',
          content: 'Simple message 2',
          senderId: '888ayPlUh0qtDrePkJ87t',
          channelId: 'holayPlUh0qtDrePkJ87t'
        }
      ]

      channelMessageService.findAllInChannel.mockReturnValue(resExpected)
      const result =
        await channelMessageResolver.findAllChannelMessageInChannel('1')

      expect(result).toStrictEqual(resExpected)
      expect(channelMessageService.findAllInChannel).toHaveBeenCalledWith('1')
    })

    it('findAllChannelMessageInChannelByUser', async () => {
      const resExpected = [
        {
          id: '1',
          content: 'Simple message 1',
          senderId: '2',
          channelId: '1'
        },
        {
          id: '2',
          content: 'Simple message 2',
          senderId: '2',
          channelId: '1'
        }
      ]

      channelMessageService.findAllInChannelByUser.mockReturnValue(resExpected)
      const result =
        await channelMessageResolver.findAllChannelMessageInChannelByUser(
          '1',
          '2'
        )

      expect(result).toStrictEqual(resExpected)
      expect(channelMessageService.findAllInChannelByUser).toHaveBeenCalledWith(
        '1',
        '2'
      )
    })

    it('findAllChannelMessageThatContain', async () => {
      const resExpected = [
        {
          id: '1',
          content: 'hello message 1',
          senderId: '2',
          channelId: '1'
        },
        {
          id: '2',
          content: 'hello message 2',
          senderId: '2',
          channelId: '1'
        }
      ]

      channelMessageService.findAllThatContain.mockReturnValue(resExpected)
      const result =
        await channelMessageResolver.findAllChannelMessageThatContain(
          '1',
          'hello'
        )

      expect(result).toStrictEqual(resExpected)
      expect(channelMessageService.findAllThatContain).toHaveBeenCalledWith(
        '1',
        'hello'
      )
    })
  })

  describe('Test ValidationPipe', () => {
    it('CreateChannelMessage', async () => {
      const data = {
        content: 'Simple message',
        senderId: '765ayPlUh0qtDrePkJ87t',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: CreateChannelMessageInput,
        data: ''
      }
      const response = await validationPipe.transform(data, metadata)
      expect(response).toStrictEqual(data)
    })

    it('UpdateChannelMessage', async () => {
      const data = {
        content: 'Simple message'
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: UpdateChannelMessageInput,
        data: ''
      }
      const response = await validationPipe.transform(data, metadata)
      expect(response).toStrictEqual(data)
    })
  })

  describe('Test Error', () => {
    describe('content - string (mandatory)', () => {
      it('content - empty', async () => {
        const data = {
          content: '',
          senderId: '765ayPlUh0qtDrePkJ87t',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMessageInput,
          data: ''
        }
        const res = {
          message: ['content must be between 1 and 2000 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('content - too long', async () => {
        const data = {
          content:
            'long message HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          senderId: '765ayPlUh0qtDrePkJ87t',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMessageInput,
          data: ''
        }
        const res = {
          message: ['content must be between 1 and 2000 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('content - undefined', async () => {
        const data = {
          senderId: '765ayPlUh0qtDrePkJ87t',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMessageInput,
          data: ''
        }
        const res = {
          message: [
            'content must be between 1 and 2000 characters long.',
            'content must be a string.'
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

    describe('senderId - nanoid tests (mandatory)', () => {
      it('senderId - invalid characters', async () => {
        const data = {
          content: 'Simple message',
          senderId: '765ayPlUh0qtDrePkJ87;',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMessageInput,
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

      it('senderId - too short', async () => {
        const data = {
          content: 'Simple message',
          senderId: '765ayPlUh0qtDrePkJ87',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMessageInput,
          data: ''
        }
        const res = {
          message: ['senderId must be exactly 21 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('senderId - too long', async () => {
        const data = {
          content: 'Simple message',
          senderId: '765ayPlUh0qtDrePkJ87tt',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMessageInput,
          data: ''
        }
        const res = {
          message: ['senderId must be exactly 21 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('senderId - invalid type', async () => {
        const data = {
          content: 'Simple message',
          senderId: 75,
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMessageInput,
          data: ''
        }
        const res = {
          message: [
            'senderId must be exactly 21 characters long.',
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

      it('senderId - null', async () => {
        const data = {
          content: 'Simple message',
          senderId: null,
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMessageInput,
          data: ''
        }
        const res = {
          message: [
            'senderId must be exactly 21 characters long.',
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

      it('senderId - undefined', async () => {
        const data = {
          content: 'Simple message',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMessageInput,
          data: ''
        }
        const res = {
          message: [
            'senderId must be exactly 21 characters long.',
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
          content: 'Simple message',
          channelId: '765ayPlUh0qtDrePkJ87;',
          senderId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMessageInput,
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
          content: 'Simple message',
          channelId: '765ayPlUh0qtDrePkJ87',
          senderId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMessageInput,
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
          content: 'Simple message',
          channelId: '765ayPlUh0qtDrePkJ87tt',
          senderId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMessageInput,
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
          content: 'Simple message',
          channelId: 75,
          senderId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMessageInput,
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
          content: 'Simple message',
          senderId: 'pihayPlUh0qtDrePkJ87t',
          channelId: null
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMessageInput,
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
          content: 'Simple message',
          senderId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMessageInput,
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
