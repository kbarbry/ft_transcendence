import { Test, TestingModule } from '@nestjs/testing'
import { UserPresenceService } from '../user-presence/user-presence.service'
import { RelationRequestsService } from '../relation-requests/relation-requests.service'
import { RelationFriendService } from '../relation-friend/relation-friend.service'
import { RelationBlockedService } from './relation-blocked.service'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from '../user/user.service'
// import { cleanDataBase } from '../../test/setup-environment'
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
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('a2OayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1)`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('baaayPlUh0qtDrePkJ87t', 'random url', 'adel@42.fr', 'Adelou', 'oui', null, null, false, 'Online', 'English', 1)`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('j6-X94_NVjmzVm9QL3k4r', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12)`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('bbbbyPlUh0qtDrePkJ87t', 'random url', 'mama@42.fr', 'mama', 'oui', null, null, false, 'Online', 'English', 1)`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('ccccyPlUh0qtDrePkJ87t', 'random url', 'maurice@42.fr', 'Momo', 'oui', null, null, false, 'Online', 'English', 1)`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('ddddyPlUh0qtDrePkJ87t', 'random url', 'suzette@42.fr', 'Suzette', 'oui', null, null, false, 'Online', 'English', 1)`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('eeeeyPlUh0qtDrePkJ87t', 'random url', 'mauricette@42.fr', 'Momoe', 'oui', null, null, false, 'Online', 'English', 1)`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('j9-X94_NVjmzVm9QL3k4r', 'random url', 'seveneleven@42.fr', '79', 'oui', null, null, false, 'Online', 'English', 1)`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('drfOayPwwUh12tDrePkJ8', 'random url', 'other@42.fr', 'other', 'oui', null, null, false, 'Online', 'English', 1)`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('qci4ayPwwUh12tDrePkJ8', 'random url', 'dad42.fr', 'dad', 'oui', null, null, false, 'Online', 'English', 1);`

    ///////////////////////////////////////////////////
    //            USER PRESENCE CREATION
    ///////////////////////////////////////////////////

    // await prismaService.$executeRaw`INSERT INTO "public"."RelationBlocked" VALUES ('a2OayPlUh0qtDrePkJ87t', 'baaayPlUh0qtDrePkJ87t'),`
    // await prismaService.$executeRaw`INSERT INTO "public"."RelationBlocked" VALUES ('eeeeyPlUh0qtDrePkJ87t', 'ddddyPlUh0qtDrePkJ87t'),`
    // await prismaService.$executeRaw`INSERT INTO "public"."RelationBlocked" VALUES ('eeeeyPlUh0qtDrePkJ87t', 'ccccyPlUh0qtDrePkJ87t'),`
    // await prismaService.$executeRaw`INSERT INTO "public"."RelationBlocked" VALUES ('eeeeyPlUh0qtDrePkJ87t', 'bbbbyPlUh0qtDrePkJ87t');`
    await prismaService.$executeRaw`INSERT INTO
    "public"."RelationBlocked"
    VALUES
    ('a2OayPlUh0qtDrePkJ87t', 'baaayPlUh0qtDrePkJ87t'),
    ('eeeeyPlUh0qtDrePkJ87t', 'ddddyPlUh0qtDrePkJ87t'),
    ('eeeeyPlUh0qtDrePkJ87t', 'ccccyPlUh0qtDrePkJ87t'),
    ('eeeeyPlUh0qtDrePkJ87t', 'bbbbyPlUh0qtDrePkJ87t'),
    ('drfOayPwwUh12tDrePkJ8', 'j9-X94_NVjmzVm9QL3k4r'),
    ('qci4ayPwwUh12tDrePkJ8', 'j9-X94_NVjmzVm9QL3k4r');`
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
    it('should return isBlocked - false - uknown userA', async () => {
      const result = await userBlockedService.isBlocked(
        'bcdefPlUh0qtDrePkJ87t',
        'a2OayPlUh0qtDrePkJ87tt'
      )
      console.log('isBlocked result in spec uknown userA: ', result)
      expect(result).toBe(false)
    })
    it('should return isBlocked - false - uknown userB', async () => {
      const result = await userBlockedService.isBlocked(
        'ccccyPlUh0qtDrePkJ87t',
        'jeanPlUh0qtDrePkJ87tt'
      )
      console.log('isBlocked result in spec uknown userA: ', result)
      expect(result).toBe(false)
    })
    describe('TEST QUERY', () => {
      it('should return isBlocked - true', async () => {
        const result = await userBlockedService.isBlocked(
          'a2OayPlUh0qtDrePkJ87t',
          'baaayPlUh0qtDrePkJ87t'
        )
        console.log('isBlocked result in spec: ', result)
        expect(result).toBe(true)
      })
      ////////////////////////////////
      it('should create a blockedRelation', async () => {
        const resBlocked = await userBlockedService.create(
          'a2OayPlUh0qtDrePkJ87t',
          'j6-X94_NVjmzVm9QL3k4r'
        )
        console.log(resBlocked)
        const expectedRes = {
          userBlockedId: 'j6-X94_NVjmzVm9QL3k4r',
          userBlockingId: 'a2OayPlUh0qtDrePkJ87t'
        }
        expect(resBlocked).toStrictEqual(expectedRes)
      })
      ////////////////////////////////
      it('should create a blockedRelation - 2', async () => {
        const resBlocked = await userBlockedService.create(
          'a2OayPlUh0qtDrePkJ87t',
          'ddddyPlUh0qtDrePkJ87t'
        )
        console.log(resBlocked)
        const expectedRes = {
          userBlockedId: 'ddddyPlUh0qtDrePkJ87t',
          userBlockingId: 'a2OayPlUh0qtDrePkJ87t'
        }
        expect(resBlocked).toStrictEqual(expectedRes)
      })
      ////////////////////////////////
      it('should create a blockedRelation - 3', async () => {
        const resBlocked = await userBlockedService.create(
          'a2OayPlUh0qtDrePkJ87t',
          'bbbbyPlUh0qtDrePkJ87t'
        )
        console.log(resBlocked)
        const expectedRes = {
          userBlockedId: 'bbbbyPlUh0qtDrePkJ87t',
          userBlockingId: 'a2OayPlUh0qtDrePkJ87t'
        }
        expect(resBlocked).toStrictEqual(expectedRes)
      })
      it('Should return ExceptionAlreadyBlocked', async () => {
        try {
          const resBlocked2 = await userBlockedService.create(
            'a2OayPlUh0qtDrePkJ87t',
            'j6-X94_NVjmzVm9QL3k4r'
          )
          expect(resBlocked2).not.toBeNull()
        } catch (error) {
          console.error(error)
          expect(error).toBeInstanceOf(ExceptionAlreadyBlocked)
        }
      })
      //should return Other users blocked by id in param
      //PARLER AUX AUTRES D'INVERSER LES NOMS DES FINDALL
      it('findAllBlockedUser - should find one one user blocked by ID', async () => {
        const findUsers = await userBlockedService.findAllBlockedByUser(
          'a2OayPlUh0qtDrePkJ87t'
        )
        const expectedRes = ['baaayPlUh0qtDrePkJ87t']
        expect(findUsers).toStrictEqual(expectedRes)
        console.log('findAllBlockedUser', findUsers)
      })
    })
    it('findAllBlockedUser - should find users blocked by ID', async () => {
      const blockedUsers = await userBlockedService.findAllBlockedByUser(
        'eeeeyPlUh0qtDrePkJ87t'
      )
      const expectedBlockedUsers = [
        'ddddyPlUh0qtDrePkJ87t',
        'ccccyPlUh0qtDrePkJ87t',
        'bbbbyPlUh0qtDrePkJ87t'
      ]
      expect(blockedUsers).toEqual(expectedBlockedUsers)
      console.log('return of findAllBlockedUser: ', blockedUsers)
    })
  })
  it('findAllBlockingUser - should find users blocking ID', async () => {
    const blockedUsers = await userBlockedService.findAllBlockingByUser(
      'j9-X94_NVjmzVm9QL3k4r'
    )
    const expectedBlockedUsers = [
      'drfOayPwwUh12tDrePkJ8',
      'qci4ayPwwUh12tDrePkJ8'
    ]
    expect(blockedUsers).toEqual(expectedBlockedUsers)
    console.log('return of findAllBlockingUser: ', blockedUsers)
  })
  describe('TEST ERROR', () => {
    it('should return ExceptionBlockedYourself', async () => {
      try {
        const resBlocked = await userBlockedService.create(
          'aaaayPlUh0qtDrePkJ87t',
          'aaaayPlUh0qtDrePkJ87t'
        )
        expect(resBlocked).not.toBeNull()
      } catch (error) {
        // console.error(error)
        expect(error).toBeInstanceOf(ExceptionBlockedYourself)
      }
    })
    it('should return isBlocked - false - wrong order test', async () => {
      const result = await userBlockedService.isBlocked(
        'baaayPlUh0qtDrePkJ87t',
        'a2OayPlUh0qtDrePkJ87t'
      )
      console.log('isBlocked result in spec wrong order: ', result)
      expect(result).toBe(false)
    })
  })
})

//rest to test
//findAllBlockingByUser
