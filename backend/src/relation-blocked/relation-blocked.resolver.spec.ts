import { Test, TestingModule } from '@nestjs/testing'
import { RelationBlockedResolver } from './relation-blocked.resolver'
import { RelationBlockedService } from './relation-blocked.service'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { RelationBlockedInput } from './dto/create-relation-blocked.input'

describe('UserBlockedResolver', () => {
  let relationBlockedresolver: RelationBlockedResolver
  const validationPipe = new ValidationPipe()

  const relationBlockedService = {
    create: jest.fn(),
    delete: jest.fn(),
    isBlocked: jest.fn(),
    findAllBlockedByUser: jest.fn()
  }
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelationBlockedResolver,
        { provide: RelationBlockedService, useValue: relationBlockedService },
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
  describe('Test Mutation', () => {
    it('createRelationblocked', async () => {
      const data: RelationBlockedInput = {
        userBlockingId: '1',
        userBlockedId: '2'
      }
      const resExpected = { id: '1', ...data }
      relationBlockedService.create.mockReturnValue(resExpected)

      const result = await relationBlockedresolver.createRelationBlocked(data)

      expect(result).toStrictEqual(resExpected)
      expect(relationBlockedService.create).toHaveBeenCalledWith(data)
    })
    it('delete RelationBlocked', async () => {
      const resExpected = { userBlockingId: '1' }
      relationBlockedService.delete.mockReturnValue(resExpected)

      const result = await relationBlockedresolver.deleteRelationBlocked(
        '1',
        '2'
      )

      expect(result).toStrictEqual(resExpected)
      expect(relationBlockedService.delete).toHaveBeenCalledWith('1', '2')
    })
  })
  describe('Test Query', () => {
    it('isRelationBlocked', async () => {
      const resExpected = true
      relationBlockedService.isBlocked.mockReturnValue(resExpected)
      const result = await relationBlockedresolver.isRelationBlocked('1', '2')

      expect(result).toStrictEqual(resExpected)
      expect(relationBlockedService.isBlocked).toHaveBeenCalledWith('1', '2')
    })
  })
  it('findAllRelationBlockedByUser', async () => {
    const resExpected = [
      {
        userBlockingId: '1',
        userBlockedId: '2'
      },
      {
        userBlockingId: '1',
        userBlockedId: '23'
      }
    ]
    relationBlockedService.findAllBlockedByUser.mockReturnValue(resExpected)

    const result = await relationBlockedresolver.findAllRelationBlockedByUser(
      '1'
    )

    expect(result).toStrictEqual(resExpected)
    expect(relationBlockedService.findAllBlockedByUser).toHaveBeenCalledWith(
      '1'
    )
  })
  describe('Test ValidationPipe', () => {
    it('createRelationblocked', async () => {
      const data = {
        userBlockingId: '111111111111111111111',
        userBlockedId: '232222222222222222222'
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: RelationBlockedInput,
        data: ''
      }
      const response = await validationPipe.transform(data, metadata)
      expect(response).toStrictEqual(data)
    })
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
