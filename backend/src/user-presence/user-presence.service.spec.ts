import { Test, TestingModule } from '@nestjs/testing'
import { UserPresenceService } from './user-presence.service'
import { PrismaService } from '../prisma/prisma.service'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { cleanDataBase } from '../../test/setup-environment'
import { ExceptionIsConnectedShouldBeTrue } from '../user/exceptions/user-presence.exception'

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
    //**************************************************//
    //  MAKE IT CLEAN
    //**************************************************//
    await cleanDataBase(prismaService)

    //**************************************************//
    //  USER CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('d2OayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('j6-X94_NVjmzVm9QL3k4r', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('_U0vTLhbNpjA39Pc7wwtn', 'random url', 'bob@42.fr', 'Bobby', 'Babby', null, null, false, 'Online', 'English', 1);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('c-vzGU-8QlEvmHk8rjNRI', 'random url', 'david@42.fr', 'dav', 'oui', null, null, false, 'Invisble', 'French', 12);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('a5cfce0', 'random url', 'evan@42.fr', 'evee', 'oui', null, null, false, 'Idle', 'Spanish', 36);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('f568b3a', 'random url', 'frank@42.fr', 'punisher', 'oui', null, null, false, 'DoNotDisturb', 'Spanish', 9000);`

    //**************************************************//
    //  USER PRESENCE CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO "public"."UserPresence" VALUES ('drfOayPwwUh12tDrePkJ8', 'd2OayPlUh0qtDrePkJ87t', '2023-09-13 10:00:00', null, true);`
    await prismaService.$executeRaw`INSERT INTO "public"."UserPresence" VALUES ('qci4ayPwwUh12tDrePkJ8', 'j6-X94_NVjmzVm9QL3k4r', '2023-09-13 11:00:00', null, true);`
    await prismaService.$executeRaw`INSERT INTO "public"."UserPresence" VALUES ('yui1ayPwwUh12tDrePkJ8', '_U0vTLhbNpjA39Pc7wwtn', '2023-09-13 12:00:00', null, true);`
    await prismaService.$executeRaw`INSERT INTO "public"."UserPresence" VALUES ('gru1ayPwwUh12tDrePkJ8', '_U0vTLhbNpjA39Pc7wwtn', '2023-09-13 13:00:00', null, true);`
  })

  afterAll(async () => {
    await cleanDataBase(prismaService)
    await prismaService.$disconnect()
  })

  it('userPresenceService should be defined', () => {
    expect(userPresenceService).toBeDefined()
  })
  it('prismaService should be defined', () => {
    expect(prismaService).toBeDefined()
  })

  describe('Test Mutation', () => {
    userPresenceData = {
      id: 'drfOayWwwUh12tDrePkJ8',
      connectedAt: new Date(),
      user: {
        connect: {
          id: 'd2OayPlUh0qtDrePkJ87t'
        }
      }
    }

    it('should create a new UserPresence and isConnected should be true', async () => {
      const userPresence = await userPresenceService.create(userPresenceData)
      expect(userPresence).toBeDefined()
      expect(userPresence.connectedAt).toStrictEqual(
        userPresenceData.connectedAt
      )
      expect(userPresence.isConnected).toStrictEqual(true)
    })

    it('should update disconnected value and update isConnected to false', async () => {
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
      expect(newUserPresence.isConnected).toStrictEqual(false)
    })
  })
  describe('Test Query', () => {
    it('should find the UserPresence', async () => {
      const foundUserPresence = await userPresenceService.findOne(
        'drfOayPwwUh12tDrePkJ8'
      )
      expect(foundUserPresence).toBeDefined()
      expect(foundUserPresence?.id).toStrictEqual('drfOayPwwUh12tDrePkJ8')
    })

    it('should find the last UserPresence with an UserId', async () => {
      const foundUserpresence = await userPresenceService.findLastByUserId(
        'd2OayPlUh0qtDrePkJ87t'
      )
      expect(foundUserpresence?.id).toStrictEqual('drfOayPwwUh12tDrePkJ8')
    })

    it('should find all UserPresence of an UserId', async () => {
      const foundUserPresence = await userPresenceService.findAllByUserId(
        '_U0vTLhbNpjA39Pc7wwtn'
      )
      expect(foundUserPresence).toBeDefined()
      expect(foundUserPresence).toHaveLength(2)
    })

    it('should update connected value', async () => {
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
  })
  describe('Test Error', () => {
    it('User presence created with already taken ID', async () => {
      const wrongUserPresenceData = {
        id: 'drfOayPwwUh12tDrePkJ8',
        connectedAt: new Date(),
        isConnected: true,
        user: {
          connect: {
            id: 'd2OayPlUh0qtDrePkJ87t'
          }
        }
      }
      expect(userPresenceService.create(wrongUserPresenceData)).rejects.toThrow(
        PrismaClientKnownRequestError
      )
    })
    it('should not be able to create a Userpresence with isConnected set to false', async () => {
      const wrongUserPresenceData = {
        id: 'drfOayWwwUh12tDrePkJ8',
        connectedAt: new Date(),
        isConnected: false,
        user: {
          connect: {
            id: 'd2OayPlUh0qtDrePkJ87t'
          }
        }
      }
      await expect(
        userPresenceService.create(wrongUserPresenceData)
      ).rejects.toThrow(ExceptionIsConnectedShouldBeTrue)
    })
  })
})
