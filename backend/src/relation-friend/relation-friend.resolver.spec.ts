import { Test, TestingModule } from '@nestjs/testing'
import { RelationFriendResolver } from './relation-friend.resolver'
import { RelationFriendService } from './relation-friend.service'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'
import { RelationFriendInput } from './dto/create-relation-friend.input'
import { PrismaService } from '../prisma/prisma.service'

describe('RelationFriendResolver', () => {
  let relationFriendResolver: RelationFriendResolver
  const validationPipe = new ValidationPipe()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationFriendResolver, RelationFriendService, PrismaService]
    }).compile()

    relationFriendResolver = module.get<RelationFriendResolver>(
      RelationFriendResolver
    )
  })

  it('RelationFriendResolver should be defined', () => {
    expect(relationFriendResolver).toBeDefined()
  })
  describe('Test Error', () => {
    describe('userAId - nanoid tests (mandatory)', () => {
      it('invalid nanoid - empty id', async () => {
        const data = {
          userBId: 'ValidIdToTestUserAID1'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationFriendInput,
          data: ''
        }
        const res = {
          message: [
            'userAId must be exactly 21 characters long.',
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
          userBId: 'ValidIdToTestUserAID1',
          userAId: null
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationFriendInput,
          data: ''
        }
        const res = {
          message: [
            'userAId must be exactly 21 characters long.',
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
          userBId: 'ValidIdToTestUserAID1',
          userAId: 'drfOayPww2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationFriendInput,
          data: ''
        }
        const res = {
          message: ['userAId must be exactly 21 characters long.'],
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
          userBId: 'ValidIdToTestUserAID1',
          userAId: 'drfOayPww2qqtDrePkqqqwJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationFriendInput,
          data: ''
        }
        const res = {
          message: ['userAId must be exactly 21 characters long.'],
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
          userBId: 'ValidIdToTestUserAID1',
          userAId: 'drfOayPww 2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationFriendInput,
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
    describe('userBId - nanoid tests (mandatory)', () => {
      it('invalid nanoid - empty id', async () => {
        const data = {
          userAId: 'ValidIdToTestUserBID1'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationFriendInput,
          data: ''
        }
        const res = {
          message: [
            'userBId must be exactly 21 characters long.',
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
          userAId: 'ValidIdToTestUserBID1',
          userBId: null
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationFriendInput,
          data: ''
        }
        const res = {
          message: [
            'userBId must be exactly 21 characters long.',
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
          userAId: 'ValidIdToTestUserBID1',
          userBId: 'drfOayPww2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationFriendInput,
          data: ''
        }
        const res = {
          message: ['userBId must be exactly 21 characters long.'],
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
          userAId: 'ValidIdToTestUserBID1',
          userBId: 'drfOayPww2qqtDrePkqqqwJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationFriendInput,
          data: ''
        }
        const res = {
          message: ['userBId must be exactly 21 characters long.'],
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
          userAId: 'ValidIdToTestUserBID1',
          userBId: 'drfOayPww 2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationFriendInput,
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
/*
    tested all methods
    tested wrong id for findall => Return an empty array
    tested create Relation with wrong id => PrismaError
    tested iFriend with wrong Id => Return false(no error is that ok ?)
    Delete with wrong id return PrismaError
*/
