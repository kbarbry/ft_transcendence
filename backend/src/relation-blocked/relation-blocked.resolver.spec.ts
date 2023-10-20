import { Test, TestingModule } from '@nestjs/testing'
import { RelationBlockedResolver } from './relation-blocked.resolver'
import { RelationBlockedService } from './relation-blocked.service'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { RelationBlockedInput } from './dto/create-relation-blocked.input'

describe('UserBlockedResolver', () => {
  let relationBlockedresolver: RelationBlockedResolver
  const validationPipe = new ValidationPipe()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelationBlockedResolver,
        RelationBlockedService,
        PrismaService
      ]
    }).compile()

    relationBlockedresolver = module.get<RelationBlockedResolver>(
      RelationBlockedResolver
    )
  })

  it('UserBlocked Resolver should be defined', () => {
    expect(relationBlockedresolver).toBeDefined()
  })
  describe('Test Error', () => {
    describe('userBlockingId - nanoid tests (mandatory)', () => {
      it('invalid nanoid - empty id', async () => {
        const data = {
          userBlockedId: 'aaaValidIdToTestuId1a'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationBlockedInput,
          data: ''
        }
        const res = {
          message: [
            'userBlockingId must be exactly 21 characters long.',
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
          userBlockedId: 'aaaValidIdToTestuId1a',
          userBlockingId: null
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationBlockedInput,
          data: ''
        }
        const res = {
          message: [
            'userBlockingId must be exactly 21 characters long.',
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
          userBlockedId: 'aaaValidIdToTestuId1a',
          userBlockingId: 'drfOayPww2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationBlockedInput,
          data: ''
        }
        const res = {
          message: ['userBlockingId must be exactly 21 characters long.'],
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
          userBlockedId: 'aaaValidIdToTestuId1a',
          userBlockingId: 'drfOayPww2qqtDrePkqqqwJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationBlockedInput,
          data: ''
        }
        const res = {
          message: ['userBlockingId must be exactly 21 characters long.'],
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
          userBlockedId: 'aaaValidIdToTestuId1a',
          userBlockingId: 'drfOayPww 2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationBlockedInput,
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
    describe('userBlockedId - nanoid tests (mandatory)', () => {
      it('invalid nanoid - empty id', async () => {
        const data = {
          userBlockingId: 'ValidIdToTestuserBloc'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationBlockedInput,
          data: ''
        }
        const res = {
          message: [
            'userBlockedId must be exactly 21 characters long.',
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
          userBlockingId: 'ValidIdToTestuserBloc',
          userBlockedId: null
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationBlockedInput,
          data: ''
        }
        const res = {
          message: [
            'userBlockedId must be exactly 21 characters long.',
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
          userBlockingId: 'ValidIdToTestuserBloc',
          userBlockedId: 'drfOayPww2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationBlockedInput,
          data: ''
        }
        const res = {
          message: ['userBlockedId must be exactly 21 characters long.'],
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
          userBlockingId: 'ValidIdToTestuserBloc',
          userBlockedId: 'drfOayPww2qqtDrePkqqqwJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationBlockedInput,
          data: ''
        }
        const res = {
          message: ['userBlockedId must be exactly 21 characters long.'],
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
          userBlockingId: 'ValidIdToTestuserBloc',
          userBlockedId: 'drfOayPww 2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: RelationBlockedInput,
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
  All methods tested
  findall with invalidID
  Delete invalidID
  IsRelationBlocked with wrong id return false
*/
