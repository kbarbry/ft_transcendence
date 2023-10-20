import { Test, TestingModule } from '@nestjs/testing'
import { RelationRequestsResolver } from './relation-requests.resolver'
import { RelationRequestsService } from './relation-requests.service'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'
import { RelationRequestsInput } from './dto/create-relation-requests.input'
import { PrismaService } from '../prisma/prisma.service'
import { RelationBlockedService } from '../relation-blocked/relation-blocked.service'
import { RelationFriendService } from '../relation-friend/relation-friend.service'

describe('UserResolver', () => {
  let relationRequestResolver: RelationRequestsResolver
  const validationPipe = new ValidationPipe()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelationRequestsResolver,
        RelationRequestsService,
        PrismaService,
        RelationBlockedService,
        RelationFriendService
      ]
    }).compile()

    relationRequestResolver = module.get<RelationRequestsResolver>(
      RelationRequestsResolver
    )
  })

  it('should be defined', () => {
    expect(relationRequestResolver).toBeDefined()
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
