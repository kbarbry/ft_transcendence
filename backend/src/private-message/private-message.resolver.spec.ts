import { Test, TestingModule } from '@nestjs/testing'
import { PrivateMessageService } from './private-message.service'
import { PrivateMessageResolver } from './private-message.resolver'
import { PrismaService } from '../prisma/prisma.service'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'
import { UpdatePrivateMessageInput } from './dto/update-private-message.input'
import { CreatePrivateMessageInput } from './dto/create-private-message.input'
import { PubSubModule } from '../common/ws/pubsub.module'

describe('PrivateMessageResolver', () => {
  let privateMessageresolver: PrivateMessageResolver
  let validationPipe = new ValidationPipe()
  const privateMessageService = {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn(),
    findAllMessageWith: jest.fn(),
    findPrivateMessageContain: jest.fn()
  }
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrivateMessageResolver,
        { provide: PrivateMessageService, useValue: privateMessageService },
        PrismaService
      ],
      imports: [PubSubModule]
    }).compile()
    privateMessageresolver = module.get<PrivateMessageResolver>(
      PrivateMessageResolver
    )
  })

  beforeEach(() => {
    validationPipe = new ValidationPipe()
    jest.clearAllMocks()
    privateMessageService.create.mockReset()
  })
  it('privateMessage should be defined', () => {
    expect(privateMessageresolver).toBeDefined()
  })

  describe('Test Mutation', () => {
    it('createPrivateMessage', async () => {
      const data: CreatePrivateMessageInput = {
        content: 'this is a message',
        senderId: '1',
        receiverId: '2'
      }
      const mockContext = {
        req: {
          user: {
            id: '1'
          }
        }
      }
      const resExpected = { id: '1', ...data }

      privateMessageService.create.mockReturnValue(resExpected)
      const result = await privateMessageresolver.createPrivateMessage(
        data,
        mockContext
      )

      expect(result).toStrictEqual(resExpected)
      expect(privateMessageService.create).toHaveBeenCalledWith(data)
    })
    it('updatePrivateMessage', async () => {
      const data: UpdatePrivateMessageInput = {
        content: 'this is a message'
      }
      const mockContext = {
        req: {
          user: {
            id: '1'
          }
        }
      }
      jest
        .spyOn(privateMessageresolver, 'findOnePrivateMessage')
        .mockResolvedValue({
          id: '1',
          content: 'original message',
          senderId: '1',
          receiverId: '2',
          createdAt: new Date()
        })
      const resExpected = { id: '1', ...data }

      privateMessageService.update.mockReturnValue(resExpected)
      const result = await privateMessageresolver.updatePrivateMessage(
        '1',
        data,
        mockContext
      )

      expect(result).toStrictEqual(resExpected)
      expect(privateMessageService.update).toHaveBeenCalledWith('1', data)
    })
    it('deletePrivateMessage', async () => {
      const resExpected = { id: '1' }
      const mockContext = {
        req: {
          user: {
            id: '1'
          }
        }
      }
      jest
        .spyOn(privateMessageresolver, 'findOnePrivateMessage')
        .mockResolvedValue({
          id: '1',
          content: 'original message',
          senderId: '1',
          receiverId: '2',
          createdAt: new Date()
        })

      privateMessageService.delete.mockReturnValue(resExpected)
      const result = await privateMessageresolver.deletePrivateMessage(
        '1',
        mockContext
      )

      expect(result).toStrictEqual(resExpected)
      expect(privateMessageService.delete).toHaveBeenCalledWith('1')
    })
  })
  describe('Test Query', () => {
    it('findOnePrivateMessage', async () => {
      const resExpected = {
        senderId: '1',
        receiverId: '2',
        content: 'original message',
        createdAt: '2023-12-01T18:25:41.658Z'
      }
      privateMessageService.findOne.mockReturnValue(resExpected)
      const result = await privateMessageresolver.findOnePrivateMessage('1')

      expect(result?.content).toStrictEqual(resExpected.content)
      expect(result?.senderId).toStrictEqual(resExpected.senderId)
      expect(result?.receiverId).toStrictEqual(resExpected.receiverId)
    })
    it('findAllPrivateMessageWith', async () => {
      const resExpected = [
        {
          senderId: '1',
          receiverId: '2',
          content: 'this is a message'
        },
        {
          senderId: '12',
          receiverId: '23',
          content: 'this is a message'
        }
      ]
      privateMessageService.findAllMessageWith.mockReturnValue(resExpected)

      const result = await privateMessageresolver.findAllPrivateMessageWith(
        '1',
        '2'
      )

      expect(result).toStrictEqual(resExpected)
      expect(privateMessageService.findAllMessageWith).toHaveBeenCalledWith(
        '1',
        '2'
      )
    })
    it('findPrivateMessageContain', async () => {
      const resExpected = [
        {
          senderId: '1',
          receiverId: '2',
          content: 'this is a message needle'
        },
        {
          senderId: '122',
          receiverId: '233',
          content: 'this is a message needle'
        }
      ]

      privateMessageService.findPrivateMessageContain.mockReturnValue(
        resExpected
      )

      const result = await privateMessageresolver.findAllPrivateMessageContain(
        '1',
        '2',
        'needle'
      )

      expect(result).toStrictEqual(resExpected)
      expect(
        privateMessageService.findPrivateMessageContain
      ).toHaveBeenCalledWith('1', '2', 'needle')
    })
  })
  describe('Test ValidationPipe', () => {
    it('createUser', async () => {
      const data = {
        senderId: '111111111111111111111',
        receiverId: '222222222222222222222',
        content: 'this is a message needle'
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: CreatePrivateMessageInput,
        data: ''
      }
      const response = await validationPipe.transform(data, metadata)
      expect(response).toStrictEqual(data)
    })
    it('updateUser', async () => {
      const data = {
        senderId: '111111111111111111111',
        receiverId: '222222222222222222222',
        content: 'this is a message needle'
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: UpdatePrivateMessageInput,
        data: ''
      }
      const response = await validationPipe.transform(data, metadata)
      expect(response).toStrictEqual(data)
    })
  })
  describe('Test Error', () => {
    describe('senderId - nanoid tests (mandatory)', () => {
      it('invalid nanoid - empty id', async () => {
        const data = {
          content: 'this is a valid content',
          receiverId: 'aaaValidIdToTestuId1a'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreatePrivateMessageInput,
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
      it('invalid nanoid - null nanoId', async () => {
        const data = {
          content: 'this is a valid content',
          receiverId: 'aaaValidIdToTestuId1a',
          senderId: null
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreatePrivateMessageInput,
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
      it('too short nanoid', async () => {
        const data = {
          content: 'this is a valid content',
          receiverId: 'aaaValidIdToTestuId1a',
          senderId: 'drfOayPww2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreatePrivateMessageInput,
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
      it('too long nanoid', async () => {
        const data = {
          content: 'this is a valid content',
          receiverId: 'aaaValidIdToTestuId1a',
          senderId: 'drfOayPww2qqtDrePkqqqwJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreatePrivateMessageInput,
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
      it('invalid char in nanoid', async () => {
        const data = {
          content: 'this is a valid content',
          receiverId: 'aaaValidIdToTestuId1a',
          senderId: 'drfOayPww 2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreatePrivateMessageInput,
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
    describe('receiverId - nanoid tests (mandatory)', () => {
      it('invalid nanoid - empty id', async () => {
        const data = {
          content: 'this is a valid content',
          senderId: 'ValidIdToTestuserBloc'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreatePrivateMessageInput,
          data: ''
        }
        const res = {
          message: [
            'receiverId must be exactly 21 characters long.',
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
          content: 'this is a valid content',
          senderId: 'ValidIdToTestuserBloc',
          receiverId: null
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreatePrivateMessageInput,
          data: ''
        }
        const res = {
          message: [
            'receiverId must be exactly 21 characters long.',
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
          content: 'this is a valid content',
          senderId: 'ValidIdToTestuserBloc',
          receiverId: 'drfOayPww2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreatePrivateMessageInput,
          data: ''
        }
        const res = {
          message: ['receiverId must be exactly 21 characters long.'],
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
          content: 'this is a valid content',
          senderId: 'ValidIdToTestuserBloc',
          receiverId: 'drfOayPww2qqtDrePkqqqwJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreatePrivateMessageInput,
          data: ''
        }
        const res = {
          message: ['receiverId must be exactly 21 characters long.'],
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
          content: 'this is a valid content',
          senderId: 'ValidIdToTestuserBloc',
          receiverId: 'drfOayPww 2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreatePrivateMessageInput,
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
    describe('content- string tests (mandatory)', () => {
      it('invalid content - no username', async () => {
        const data = {
          senderId: 'ValidIdToTestuserBloc',
          receiverId: 'ValidIdToTestuserBlod'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreatePrivateMessageInput,
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
      it('invalid content - null', async () => {
        const data = {
          senderId: 'ValidIdToTestuserBloc',
          receiverId: 'ValidIdToTestuserBlod',
          content: null
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreatePrivateMessageInput,
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
      it('too short string', async () => {
        const data = {
          senderId: 'ValidIdToTestuserBloc',
          receiverId: 'ValidIdToTestuserBlod',
          content: ''
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreatePrivateMessageInput,
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
      it('too long string', async () => {
        const data: CreatePrivateMessageInput = {
          senderId: 'ValidIdToTestuserBloc',
          receiverId: 'ValidIdToTestuserBlod',
          content:
            'usernameloooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong \
            usernamelooooooooooooooooooong usernamelooooooooooooooooooong'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreatePrivateMessageInput,
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
    })
  })
})
