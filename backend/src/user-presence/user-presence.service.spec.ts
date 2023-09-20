import { Test, TestingModule } from '@nestjs/testing'
import { UserPresenceService } from './user-presence.service'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from '../user/user.service'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ExceptionTryingToUpdateID } from '../user/exceptions/user.exceptions'

describe('UserPresenceService', () => {
  let userPresenceService: UserPresenceService
  let prismaService: PrismaService
  let userPresenceData: any

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPresenceService, PrismaService] // Incluez le PrismaService dans les providers
    }).compile()

    userPresenceService = module.get<UserPresenceService>(UserPresenceService)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  beforeEach(async () => {
    ///////////////////////////////////////////////////
    // User Creation
    ///////////////////////////////////////////////////

    await prismaService.$executeRaw`DELETE FROM "public"."User";`
    await prismaService.$executeRaw`DELETE FROM "public"."UserPresence";`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('d2OayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('j6-X94_NVjmzVm9QL3k4r', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('_U0vTLhbNpjA39Pc7wwtn', 'random url', 'bob@42.fr', 'Bobby', 'Babby', null, null, false, 'Online', 'English', 1);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('c-vzGU-8QlEvmHk8rjNRI', 'random url', 'david@42.fr', 'dav', 'oui', null, null, false, 'Invisble', 'French', 12);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('a5cfce0', 'random url', 'evan@42.fr', 'evee', 'oui', null, null, false, 'Idle', 'Spanish', 36);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('f568b3a', 'random url', 'frank@42.fr', 'punisher', 'oui', null, null, false, 'DoNotDisturb', 'Spanish', 9000);`

    ///////////////////////////////////////////////////
    // UserPresence Creation
    ///////////////////////////////////////////////////

    await prismaService.$executeRaw`INSERT INTO "public"."UserPresence" VALUES ('drfOayPwwUh12tDrePkJ8', 'd2OayPlUh0qtDrePkJ87t', '2023-09-13 10:00:00');`
    await prismaService.$executeRaw`INSERT INTO "public"."UserPresence" VALUES ('qci4ayPwwUh12tDrePkJ8', 'j6-X94_NVjmzVm9QL3k4r', '2023-09-13 11:00:00');`
    await prismaService.$executeRaw`INSERT INTO "public"."UserPresence" VALUES ('yui1ayPwwUh12tDrePkJ8', '_U0vTLhbNpjA39Pc7wwtn', '2023-09-13 12:00:00');`
    await prismaService.$executeRaw`INSERT INTO "public"."UserPresence" VALUES ('gru1ayPwwUh12tDrePkJ8', '_U0vTLhbNpjA39Pc7wwtn', '2023-09-13 13:00:00');`

    userPresenceData = {
      id: 'drfOayWwwUh12tDrePkJ8',
      connectedAt: new Date(),
      user: {
        connect: {
          id: 'd2OayPlUh0qtDrePkJ87t'
        }
      }
    }
  })

  afterAll(async () => {
    await prismaService.$disconnect()
  })

  describe('Test UserPresence', () => {
    describe('Test UserPresence Mutation', () => {
      it('should be defined', () => {
        expect(UserPresenceService).toBeDefined()
      })
      it('Should create a new UserPresence', async () => {
        const userPresence = await userPresenceService.create(userPresenceData)
        expect(userPresence).toBeDefined()
        expect(userPresence.connectedAt).toStrictEqual(
          userPresenceData.connectedAt
        )
      })
      it('should update the UserPresence', async () => {
        const updatedUserPresenceData = {
          disconnectedAt: new Date(),
          connectedAt: new Date()
        }
        const updatedUserPresence = await userPresenceService.update(
          'drfOayPwwUh12tDrePkJ8',
          updatedUserPresenceData
        )
        expect(updatedUserPresence.disconnectedAt).toEqual(
          updatedUserPresenceData.disconnectedAt
        )
        expect(updatedUserPresence.connectedAt).toEqual(
          updatedUserPresenceData.connectedAt
        )
      })
      it('should delete the UserPresence', async () => {
        const deletedUser = await userPresenceService.delete(
          'drfOayPwwUh12tDrePkJ8'
        )
        expect(deletedUser).toBeDefined
      })
    })
    describe('Test Query', () => {
      it('should find the UserPresence', async () => {
        const foundUserPresence = await userPresenceService.findOne(
          'drfOayPwwUh12tDrePkJ8'
        )
        console.log('logdate => ', foundUserPresence?.connectedAt)
        expect(foundUserPresence).toBeDefined
        expect(foundUserPresence?.id).toStrictEqual('drfOayPwwUh12tDrePkJ8')
      })
      it('should find the UserPresence with an UserId', async () => {
        const foundUserpresence = await userPresenceService.findOnebyUserId(
          'd2OayPlUh0qtDrePkJ87t'
        )
        expect(foundUserpresence?.id).toStrictEqual('drfOayPwwUh12tDrePkJ8')
      })
      it('should find all UserPresence of an UserId', async () => {
        const foundUserPresence = await userPresenceService.findAll(
          '_U0vTLhbNpjA39Pc7wwtn'
        )
        expect(foundUserPresence).toBeDefined
        expect(foundUserPresence).toHaveLength(2)
      })
      it('should update disconnected value', async () => {
        const newDisconnecteddata = {
          disconnectedAt: new Date()
        }
        const newUserPresence = await userPresenceService.disconnected(
          'drfOayPwwUh12tDrePkJ8',
          newDisconnecteddata.disconnectedAt
        )
        expect(newDisconnecteddata.disconnectedAt).toStrictEqual(
          newUserPresence.disconnectedAt
        )
      })
      it('should update connected value', async () => {
        const newDisconnecteddata = {
          connectedAt: new Date()
        }
        const newUserPresence = await userPresenceService.disconnected(
          'drfOayPwwUh12tDrePkJ8',
          newDisconnecteddata.connectedAt
        )
        expect(newDisconnecteddata.connectedAt).toStrictEqual(
          newUserPresence.disconnectedAt
        )
      })
    })
    describe('Test Error', () => {
      it('User presence created with already taken ID', async () => {
        expect(async () => {
          await prismaService.$executeRaw`INSERT INTO "public"."UserPresence" VALUES ('drfOayPwwUh12tDrePkJ8', 'd2OayPlUh0qtDrePkJ87t', '2023-09-13 10:00:00');`
        }).rejects.toThrow(PrismaClientKnownRequestError)
      })
      it('change id field', async () => {
        expect(async () => {
          const updatedData = { id: '5555' }
          await userPresenceService.update('drfOayPwwUh12tDrePkJ8', updatedData)
        }).rejects.toThrow(ExceptionTryingToUpdateID)
      })
      it('user presence already deleted', async () => {
        expect(async () => {
          await userPresenceService.delete('drfOayPwwUh12tDrePkJ8')
          await userPresenceService.delete('drfOayPwwUh12tDrePkJ8')
        }).rejects.toThrow(PrismaClientKnownRequestError)
      })
    })
  })
})
