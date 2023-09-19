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
  let expectedRes: {
    userSenderId: string
    userReceiverId: string
  }

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

    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('51d43c2', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('51d43c2', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1);`
    
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
    expectedRes = {
      userSenderId: userA.id,
      userReceiverId: userB.id
    }
  })

  afterAll(async () => {
    await prismaService.relationRequests.deleteMany({})
    await prismaService.relationBlocked.deleteMany({})
    await prismaService.relationFriend.deleteMany({})
    await prismaService.user.deleteMany({})
    await prismaService.$disconnect()
  })

  describe('Test UserRelationRequest Mutation', () => {
    it('Service should be defined', () => {
      expect(RelationRequestsService).toBeDefined()
    })
    describe('Create - no relation', () => {
      it('Should be created', async () => {
        const resRequest = await relationRequestsService.create(
          userA.id,
          userB.id
        )
        expect(resRequest).toStrictEqual(expectedRes)
      })
      it('Delete - exist in database', async () => {
        const resRequest = await relationRequestsService.delete(
          userA.id,
          userB.id
        )
        expect(resRequest).toStrictEqual(expectedRes)
      })
      it('Should throw ExceptionRequestAlreadySent', () => {
        expect(async () => {
          console.log('createdlaunch')
          const res = await relationBlockedService.isBlocked(userA.id, userB.id)
          console.log(res)
          await relationRequestsService.create(userA.id, userB.id)
          console.log('createdended')
          // await relationRequestsService.create(userA.id, userB.id)
        }).rejects.toThrow(ExceptionRequestAlreadySent)
      })
    })
    // describe('Should be deleted', () => {})
    // describe('Create - already asked', () => {})
  })
})
