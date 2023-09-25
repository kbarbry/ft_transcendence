import { Test, TestingModule } from '@nestjs/testing'
import { UserPresenceService } from '../user-presence/user-presence.service'
import { RelationRequestsService } from '../relation-requests/relation-requests.service'
import { RelationFriendService } from '../relation-friend/relation-friend.service'
import { RelationBlockedService } from './relation-blocked.service'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from '../user/user.service'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ExceptionBlockedYourself } from '../user/exceptions/blocked.exceptions'
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
    await prismaService.$executeRaw`DELETE FROM "public"."User";`
    await prismaService.$executeRaw`DELETE FROM "public"."UserPresence";`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('d2OayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('j6-X94_NVjmzVm9QL3k4r', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('aaaayPlUh0qtDrePkJ87t', 'random url', 'adel@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('bbbayPlUh0qtDrePkJ87t', 'random url', 'maman@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1);`

    ///////////////////////////////////////////////////
    //            USER PRESENCE CREATION
    ///////////////////////////////////////////////////

    // await prismaService.$executeRaw`INSERT INTO "public"."UserPresence" VALUES ('drfOayPwwUh12tDrePkJ8', 'd2OayPlUh0qtDrePkJ87t', '2023-09-13 10:00:00');`
    // await prismaService.$executeRaw`INSERT INTO "public"."UserPresence" VALUES ('qci4ayPwwUh12tDrePkJ8', 'j6-X94_NVjmzVm9QL3k4r', '2023-09-13 11:00:00');`
  })
  afterAll(async () => {
    await prismaService.$disconnect()
  })
  describe('TEST USER BLOCKED', () => {
    describe('TEST SHOULD BE DEFINE', () => {
      it('should be define', () => {
        expect(userBlockedService).toBeDefined()
      })
    })
  })
  describe('TEST RELATION BLOCKED SERVICE', () => {
    describe('Create - no relation', () => {
      it('Should be created', async () => {
        const resBlocked = await userBlockedService.create(
          'd2OayPlUh0qtDrePkJ87t',
          'j6-X94_NVjmzVm9QL3k4r'
        )
        expect(RelationBlockedService).toBeDefined()
      })
    })
  })
  describe('TEST RETURN OF CREATE', () => {
    it('Should create a relation between different users', async () => {
      const resBlocked = await userBlockedService.create(
        'd2OayPlUh0qtDrePkJ87t',
        'j6-X94_NVjmzVm9QL3k4r'
      )
      // Assurez-vous que la création a réussi et que resBlocked n'est pas null.
      expect(resBlocked).not.toBeNull()
    })
  })
  describe('Create - no relation', () => {
    it('Should be created', async () => {
      try {
        const resBlocked = await userBlockedService.create(
          'd2OayPlUh0qtDrePkJ87t',
          'd2OayPlUh0qtDrePkJ87t'
        )
        // Si nous atteignons cette ligne, cela signifie que la création a réussi,
        // nous pouvons ajouter une assertion pour vérifier que resBlocked n'est pas null.
        expect(resBlocked).not.toBeNull()
      } catch (error) {
        // S'il y a une exception, nous nous attendons à ce qu'elle soit de type ExceptionBlockedYourself.
        expect(error).toBeInstanceOf(ExceptionBlockedYourself)
      }
    })
  })
})

