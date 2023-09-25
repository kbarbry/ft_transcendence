import { Test, TestingModule } from '@nestjs/testing'
import { UserPresenceService } from '../user-presence/user-presence.service'
import { RelationRequestsService } from '../relation-requests/relation-requests.service'
import { RelationFriendService } from '../relation-friend/relation-friend.service'
import { RelationBlockedService } from './relation-blocked.service'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from '../user/user.service'
import { cleanDataBase } from '../../test/setup-environment'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import {
  ExceptionAlreadyBlocked,
  ExceptionBlockedYourself
} from '../user/exceptions/blocked.exceptions'
// import { ExceptionTryingToUpdateID } from '../user/exceptions/user.exceptions'

describe('UserPresenceService', () => {
  let prismaService: PrismaService
  let userPresenceService: UserPresenceService
  let userPresenceData: any
  let userBlockedService: RelationBlockedService
  let userBlockedData: any
  let userRequestService: RelationRequestsService
  let userRequestData: any
  let userFriendService: RelationFriendService
  let userFriendData: any

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPresenceService,
        PrismaService,
        RelationFriendService,
        RelationRequestsService,
        RelationBlockedService
      ]
    }).compile()

    prismaService = module.get<PrismaService>(PrismaService)
    userPresenceService = module.get<UserPresenceService>(UserPresenceService)
    userBlockedService = module.get<RelationBlockedService>(
      RelationBlockedService
    )
    userRequestService = module.get<RelationRequestsService>(
      RelationRequestsService
    )
    userFriendService = module.get<RelationFriendService>(RelationFriendService)
  })

  ///////////////////////////////////////////////////
  //              USER CREATION                    //
  ///////////////////////////////////////////////////

  beforeEach(async () => {
    // await cleanDataBase(prismaService)
    await prismaService.$executeRaw`DELETE FROM "public"."RelationBlocked";`
    await prismaService.$executeRaw`DELETE FROM "public"."User";`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('d2OayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('j6-X94_NVjmzVm9QL3k4r', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('aaaayPlUh0qtDrePkJ87t', 'random url', 'adel@42.fr', 'Adelou', 'oui', null, null, false, 'Online', 'English', 1);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('bbbbyPlUh0qtDrePkJ87t', 'random url', 'mama@42.fr', 'mama', 'oui', null, null, false, 'Online', 'English', 1);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('ccccyPlUh0qtDrePkJ87t', 'random url', 'maurice@42.fr', 'Momo', 'oui', null, null, false, 'Online', 'English', 1);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('ddddyPlUh0qtDrePkJ87t', 'random url', 'suzette@42.fr', 'Suzette', 'oui', null, null, false, 'Online', 'English', 1);`

    ///////////////////////////////////////////////////
    //            USER PRESENCE CREATION
    ///////////////////////////////////////////////////

    // await prismaService.$executeRaw`INSERT INTO "public"."UserPresence" VALUES ('drfOayPwwUh12tDrePkJ8', 'd2OayPlUh0qtDrePkJ87t', '2023-09-13 10:00:00');`
    // await prismaService.$executeRaw`INSERT INTO "public"."UserPresence" VALUES ('qci4ayPwwUh12tDrePkJ8', 'j6-X94_NVjmzVm9QL3k4r', '2023-09-13 11:00:00');`
  })
  afterAll(async () => {
    await prismaService.$disconnect()
  })
  describe('TEST MUTATION', () => {
    it('should be define', () => {
      expect(userBlockedService).toBeDefined()
    })
  })
  describe('Test Mutation', () => {
    it('relationRequest should be defined', () => {
      expect(RelationRequestsService).toBeDefined()
    })
    it('relationFriend should be defined', () => {
      expect(RelationFriendService).toBeDefined()
    })
    it('relationBlocked should be defined', () => {
      expect(RelationBlockedService).toBeDefined()
    })
    it('prismaService should be defined', () => {
      expect(RelationRequestsService).toBeDefined()
    })
    describe('TEST QUERY', () => {
      it('should create a blockedRelation', async () => {
        const resBlocked = await userBlockedService.create(
          'd2OayPlUh0qtDrePkJ87t',
          'j6-X94_NVjmzVm9QL3k4r'
        )
        // console.log(resBlocked)
        const expectedRes = {
          userBlockedId: 'j6-X94_NVjmzVm9QL3k4r',
          userBlockingId: 'd2OayPlUh0qtDrePkJ87t'
        }
        expect(resBlocked).toStrictEqual(expectedRes)
      })
      it('should return isBlocked - true', async () => {
        const result = await userBlockedService.isBlocked(
          'd2OayPlUh0qtDrePkJ87t',
          'j6-X94_NVjmzVm9QL3k4r'
        )
        console.log('isBlocked result in spec: ', result)
        expect(result).toBe(true)
      })
    })
  })
})

// const expectedRes = {
//   userSenderId: '537d4ec6daffd64a2d4c',
//   userReceiverId: '4376f06677b65d3168d6'
// }
// expect(resRequest).toStrictEqual(expectedRes)
// })

//     it('Should return ExceptionAlreadyBlocked', async () => {
//       try {
//         const resBlocked2 = await userBlockedService.create(
//           'd2OayPlUh0qtDrePkJ87t',
//           'j6-X94_NVjmzVm9QL3k4r'
//         )
//         expect(resBlocked2).not.toBeNull()
//       } catch (error) {
//         console.error(error)
//         expect(error).toBeInstanceOf(ExceptionAlreadyBlocked)
//       }
//     })
//   })
//   describe('TEST ERROR', () => {
//     it('Should return ExceptionBlockedYourself', async () => {
//       try {
//         const resBlocked = await userBlockedService.create(
//           'd2OayPlUh0qtDrePkJ87t',
//           'd2OayPlUh0qtDrePkJ87t'
//         )
//         expect(resBlocked).not.toBeNull()
//       } catch (error) {
//         // console.error(error)
//         expect(error).toBeInstanceOf(ExceptionBlockedYourself)
//       }
//     })
//   })
// })

//test wrong order

// describe('Test Error', () => {
//   it('throw an error after trying to create a new relaton in DB with an already existing id', async () => {
//     expect(async () => {
//       await relationFriendService.create(
//         '4376f06677b65d3168d6-',
//         '537d4ec6daffd64a2d4c-'
//       )
//     }).rejects.toThrow(PrismaClientKnownRequestError)
//   })
