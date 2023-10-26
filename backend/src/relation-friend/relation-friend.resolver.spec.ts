import { Test, TestingModule } from '@nestjs/testing'
import { RelationFriendResolver } from './relation-friend.resolver'
import { RelationFriendService } from './relation-friend.service'
import { PrismaService } from '../prisma/prisma.service'
import { RelationFriendInput } from './dto/create-relation-friend.input'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'

describe('RelationFriendResolver', () => {
  let relationFriendResolver: RelationFriendResolver
  const relationFriendService = {
    create: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
    isFriend: jest.fn()
  }
  let validationPipe: ValidationPipe

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelationFriendResolver,
        {
          provide: RelationFriendService,
          useValue: relationFriendService
        },
        PrismaService
      ]
    }).compile()
    relationFriendResolver = module.get<RelationFriendResolver>(
      RelationFriendResolver
    )
  })

  beforeEach(async () => {
    validationPipe = new ValidationPipe()
    jest.clearAllMocks()
    relationFriendService.create.mockReset()
  })

  it('RelationFriendResolver should be defined', () => {
    expect(relationFriendResolver).toBeDefined()
  })
  describe('Test Mutation', () => {
    it('createRelationFriend', async () => {
      const data: RelationFriendInput = {
        userAId: '1',
        userBId: '2'
      }
      const resExpected = { id: '1', ...data }
      relationFriendService.create.mockReturnValue(resExpected)

      const result = await relationFriendResolver.createRelationFriend(data)

      expect(result).toStrictEqual(resExpected)
    })
    it('delete RelationFriend', async () => {
      const resExpected = { userBlockingId: '1' }
      relationFriendService.delete.mockReturnValue(resExpected)

      const result = await relationFriendResolver.deleteRelationFriend('1', '2')

      expect(result).toStrictEqual(resExpected)
    })
  })
  describe('Test Query', () => {
    it('isRelationFriendExist', async () => {
      const resExpected = true
      relationFriendService.isFriend.mockReturnValue(resExpected)
      const result = await relationFriendResolver.isRelationFriendExist(
        '01',
        '02'
      )

      expect(result).toStrictEqual(resExpected)
      expect(relationFriendService.isFriend).toHaveBeenCalledWith('01', '02')
    })
  })
  it('findAllRelationFriend', async () => {
    const resExpected = [
      {
        userAId: '01',
        userBId: '02'
      },
      {
        userAId: '01',
        userBId: '23'
      }
    ]
    relationFriendService.findAll.mockReturnValue(resExpected)

    const result = await relationFriendResolver.findAllRelationFriend('01')

    expect(result).toStrictEqual(resExpected)
    expect(relationFriendService.findAll).toHaveBeenCalledWith('01')
  })
  describe('Test ValidationPipe', () => {
    it('createRelationFriend', async () => {
      const data = {
        userAId: '111111111111111111111',
        userBId: '232222222222222222222'
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: RelationFriendInput,
        data: ''
      }
      const response = await validationPipe.transform(data, metadata)
      expect(response).toStrictEqual(data)
    })
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
