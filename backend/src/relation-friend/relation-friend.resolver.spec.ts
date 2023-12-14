import { Test, TestingModule } from '@nestjs/testing'
import { RelationFriendResolver } from './relation-friend.resolver'
import { RelationFriendService } from './relation-friend.service'
import { PrismaService } from '../prisma/prisma.service'
import { PubSubModule } from '../common/ws/pubsub.module'

describe('RelationFriendResolver', () => {
  let relationFriendResolver: RelationFriendResolver
  const relationFriendService = {
    create: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
    isFriend: jest.fn()
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelationFriendResolver,
        {
          provide: RelationFriendService,
          useValue: relationFriendService
        },
        PrismaService
      ],
      imports: [PubSubModule]
    }).compile()
    relationFriendResolver = module.get<RelationFriendResolver>(
      RelationFriendResolver
    )
  })

  beforeEach(async () => {
    jest.clearAllMocks()
    relationFriendService.create.mockReset()
  })

  it('relationFriend should be defined', () => {
    expect(relationFriendResolver).toBeDefined()
  })

  describe('Test Mutation', () => {
    it('deleteRelationFriend', async () => {
      const resExpected = { userBlockingId: '1' }
      const mockContext = {
        req: {
          user: {
            id: '1'
          }
        }
      }
      relationFriendService.delete.mockReturnValue(resExpected)

      const result = await relationFriendResolver.deleteRelationFriend(
        '1',
        '2',
        mockContext
      )

      expect(result).toStrictEqual(resExpected)
      expect(relationFriendService.delete).toHaveBeenCalledWith('1', '2')
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
})
