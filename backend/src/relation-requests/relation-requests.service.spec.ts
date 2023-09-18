import { Test, TestingModule } from '@nestjs/testing'
import { RelationRequestsService } from './relation-requests.service'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from '../user/user.service'
import { User } from '@prisma/client'
import { RelationBlockedService } from '../relation-blocked/relation-blocked.service'
import { RelationFriendService } from '../relation-friend/relation-friend.service'
import { ExceptionRequestAlreadySent } from '../user/exceptions/request.exceptions'
import { ExceptionAlreadyBlocked } from '../user/exceptions/blocked.exceptions'

describe('RelationRequestsService', () => {
  let relationRequestsService: RelationRequestsService
  let relationBlockedService: RelationBlockedService
  let relationFriendService: RelationFriendService
  let prismaService: PrismaService
  let userService: UserService
  let userA: User
  let userB: User

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelationRequestsService,
        PrismaService,
        UserService,
        RelationBlockedService,
        RelationFriendService
      ]
    }).compile()

    relationRequestsService = module.get<RelationRequestsService>(
      RelationRequestsService
    )
    relationFriendService = module.get<RelationFriendService>(
      RelationFriendService
    )
    userService = module.get<UserService>(UserService)
    prismaService = module.get<PrismaService>(PrismaService)

    //**************************************************//
    //  USERS CREATION
    //**************************************************//

    const userAData = {
      mail: 'userA@example.com',
      username: 'userA',
      password: 'password123',
      level: 0,
      avatarUrl: 'url_de_l_avatar_par_defaut'
    }
    userA = await userService.create(userAData)
    const userBData = {
      mail: 'userB@example.com',
      username: 'userB',
      password: 'password123',
      level: 0,
      avatarUrl: 'url_de_l_avatar_par_defaut'
    }
    userB = await userService.create(userBData)
  })

  afterAll(async () => {
    await prismaService.relationRequests.deleteMany({})
    await prismaService.relationBlocked.deleteMany({})
    await prismaService.relationFriend.deleteMany({})
    await prismaService.user.deleteMany({})
    await prismaService.$disconnect()
  })

  describe('Test UserRelationRequest Mutation', () => {
    describe('Create - no relation', () => {
      it('Should be created', async () => {
        const resRequest = await relationRequestsService.create(
          userA.id,
          userB.id
        )
        console.log(resRequest)
        expect(resRequest).toBeDefined()
      })
    })
    describe('Should be deleted', () => {
      it('Delete - exist in database', async () => {
        const res = await relationRequestsService.findOne(userA.id, userB.id)
        console.log(res)
        // await relationRequestsService.create(userA.id, userB.id)
        const resRequest = await relationRequestsService.delete(
          userA.id,
          userB.id
        )
        console.log('deleted data', resRequest)
        expect(resRequest).toBeDefined()
      })
    })
    describe('Create - already asked', () => {
      it('Should throw ExceptionRequestAlreadySent', () => {
        expect(async () => {
          await relationRequestsService.create(userA.id, userB.id)
          await relationRequestsService.create(userA.id, userB.id)
        }).rejects.toThrow()
      })
    })
  })
})
