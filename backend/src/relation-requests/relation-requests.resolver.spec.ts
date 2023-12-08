import { Test, TestingModule } from '@nestjs/testing'
import { RelationRequestsResolver } from './relation-requests.resolver'
import { RelationRequestsService } from './relation-requests.service'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'
import { RelationRequestsInput } from './dto/create-relation-requests.input'
import { PrismaService } from '../prisma/prisma.service'
import { RelationBlockedService } from '../relation-blocked/relation-blocked.service'
import { RelationFriendService } from '../relation-friend/relation-friend.service'
import { PubSubModule } from '../common/ws/pubsub.module'

describe('relationRequestResolver', () => {
  let relationRequestResolver: RelationRequestsResolver
  let validationPipe = new ValidationPipe()

  const relationRequestsService = {
    create: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn(),
    isRequested: jest.fn(),
    findAllRequestReceived: jest.fn(),
    findAllRequestSent: jest.fn()
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelationRequestsResolver,
        { provide: RelationRequestsService, useValue: relationRequestsService },
        PrismaService,
        RelationBlockedService,
        RelationFriendService
      ],
      imports: [PubSubModule]
    }).compile()

    relationRequestResolver = module.get<RelationRequestsResolver>(
      RelationRequestsResolver
    )
  })

  beforeEach(() => {
    validationPipe = new ValidationPipe()
    jest.clearAllMocks()
    relationRequestsService.create.mockReset()
  })

  it('relationRequestResolver should be defined', () => {
    expect(relationRequestResolver).toBeDefined()
  })

  describe('Test Mutation', () => {
    it('createRelationRequests', async () => {
      const data: RelationRequestsInput = {
        userSenderId: '1',
        userReceiverId: '2'
      }
      const mockContext = {
        req: {
          user: {
            id: '1'
          }
        }
      }
      const resExpected = { id: '1', ...data }
      relationRequestsService.create.mockReturnValue(resExpected)

      const result = await relationRequestResolver.createRelationRequests(
        data,
        mockContext
      )

      expect(result).toStrictEqual(resExpected)
      expect(relationRequestsService.create).toHaveBeenCalledWith(data)
    })

    it('deleteRelationRequests', async () => {
      const resExpected = { id: '1' }
      const mockContext = {
        req: {
          user: {
            id: '1'
          }
        }
      }
      relationRequestsService.delete.mockReturnValue(resExpected)

      const result = await relationRequestResolver.deleteRelationRequests(
        '1',
        '2',
        mockContext
      )
      expect(result).toStrictEqual(resExpected)
      expect(relationRequestsService.delete).toHaveBeenCalledWith('1', '2')
    })
  })
  describe('Test Query', () => {
    it('findOneRelationRequests', async () => {
      const resExpected = {
        userSenderId: '1',
        userReceiverId: '2'
      }
      relationRequestsService.findOne.mockReturnValue(resExpected)

      const result = await relationRequestResolver.findOneRelationRequests(
        '1',
        '2'
      )

      expect(result).toStrictEqual(resExpected)
      expect(relationRequestsService.findOne).toHaveBeenCalledWith('1', '2')
    })

    it('isRelationRequestsRequested', async () => {
      const resExpected = true
      relationRequestsService.isRequested.mockReturnValue(resExpected)
      const result = await relationRequestResolver.isRelationRequestsRequested(
        '1',
        '2'
      )

      expect(result).toStrictEqual(resExpected)
      expect(relationRequestsService.isRequested).toHaveBeenCalledWith('1', '2')
    })
    it('findAllRelationRequestsReceived', async () => {
      const resExpected = [
        {
          userSenderId: '1',
          userReceiverId: '2'
        },
        {
          userSenderId: '1',
          userReceiverId: '3'
        }
      ]
      relationRequestsService.findAllRequestReceived.mockReturnValue(
        resExpected
      )

      const result =
        await relationRequestResolver.findAllRelationRequestsReceived('1')

      expect(result).toStrictEqual(resExpected)
      expect(
        relationRequestsService.findAllRequestReceived
      ).toHaveBeenCalledWith('1')
    })
    it('findAllRelationRequestsSent', async () => {
      const resExpected = {
        userSenderId: '1',
        userReceiverId: '2'
      }
      relationRequestsService.findAllRequestSent.mockReturnValue(resExpected)

      const result = await relationRequestResolver.findAllRelationRequestsSent(
        '1'
      )

      expect(result).toStrictEqual(resExpected)
      expect(relationRequestsService.findAllRequestSent).toHaveBeenCalledWith(
        '1'
      )
    })
  })
  describe('Test ValidationPipe', () => {
    it('create relationrequest', async () => {
      const data = {
        userSenderId: '111111111111111111111',
        userReceiverId: '222222222222222222222'
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: RelationRequestsInput,
        data: ''
      }
      const response = await validationPipe.transform(data, metadata)
      expect(response).toStrictEqual(data)
    })
  })

  describe('Test Error', () => {
    describe('userSenderId - nanoid tests (mandatory)', () => {
      it('invalid nanoid - empty id', async () => {
        const data = {
          userReceiverId: 'aaaValidIdToTestuId1a'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationRequestsInput,
          data: ''
        }
        const res = {
          message: [
            'userSenderId must be exactly 21 characters long.',
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
          userReceiverId: 'aaaValidIdToTestuId1a',
          userSenderId: null
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationRequestsInput,
          data: ''
        }
        const res = {
          message: [
            'userSenderId must be exactly 21 characters long.',
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
          userReceiverId: 'aaaValidIdToTestuId1a',
          userSenderId: 'drfOayPww2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationRequestsInput,
          data: ''
        }
        const res = {
          message: ['userSenderId must be exactly 21 characters long.'],
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
          userReceiverId: 'aaaValidIdToTestuId1a',
          userSenderId: 'drfOayPww2qqtDrePkqqqwJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationRequestsInput,
          data: ''
        }
        const res = {
          message: ['userSenderId must be exactly 21 characters long.'],
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
          userReceiverId: 'aaaValidIdToTestuId1a',
          userSenderId: 'drfOayPww 2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationRequestsInput,
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
    describe('userReceiverId - nanoid tests (mandatory)', () => {
      it('invalid nanoid - empty id', async () => {
        const data = {
          userSenderId: 'ValidIdToTestuserBloc'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationRequestsInput,
          data: ''
        }
        const res = {
          message: [
            'userReceiverId must be exactly 21 characters long.',
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
          userSenderId: 'ValidIdToTestuserBloc',
          userReceiverId: null
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationRequestsInput,
          data: ''
        }
        const res = {
          message: [
            'userReceiverId must be exactly 21 characters long.',
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
          userSenderId: 'ValidIdToTestuserBloc',
          userReceiverId: 'drfOayPww2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationRequestsInput,
          data: ''
        }
        const res = {
          message: ['userReceiverId must be exactly 21 characters long.'],
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
          userSenderId: 'ValidIdToTestuserBloc',
          userReceiverId: 'drfOayPww2qqtDrePkqqqwJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationRequestsInput,
          data: ''
        }
        const res = {
          message: ['userReceiverId must be exactly 21 characters long.'],
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
          userSenderId: 'ValidIdToTestuserBloc',
          userReceiverId: 'drfOayPww 2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationRequestsInput,
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
