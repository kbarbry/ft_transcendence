import { Test, TestingModule } from '@nestjs/testing'
import { UserPresenceService } from './user-presence.service'
import { PrismaService } from '../prisma/prisma.service'
import { cleanDataBase } from '../../test/setup-environment'
import { UserPresenceCreateInput } from './dto/create-user-presence.input'

describe('UserPresenceService', () => {
  let userPresenceService: UserPresenceService
  let prismaService: PrismaService
  let userPresenceData: UserPresenceCreateInput

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPresenceService, PrismaService]
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
    await prismaService.$executeRaw`
      INSERT INTO
      "public"."User"
      VALUES
      ('d2OayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Ally', 'oui', false, false, false, false, 'Online', 'English', 1),
      ('j6-X94_NVjmzVm9QL3k4r', 'random url', 'charlie@42.fr', 'Chacha', 'oui', false, false, false, false, 'Invisble', 'French', 12),
      ('_U0vTLhbNpjA39Pc7wwtn', 'random url', 'bob@42.fr', 'Bobby', 'Babby', false, false, false, false, 'Online', 'English', 1),
      ('c-vzGU-8QlEvmHk8rjNRI', 'random url', 'david@42.fr', 'dav', 'oui', false, false, false, false, 'Invisble', 'French', 12),
      ('a5cfce0', 'random url', 'evan@42.fr', 'evee', 'oui', false, false, false, false, 'Idle', 'Spanish', 36),
      ('f568b3a', 'random url', 'frank@42.fr', 'punisher', 'oui', false, false, false, false, 'DoNotDisturb', 'Spanish', 9000);`

    //**************************************************//
    //  USER PRESENCE CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO "public"."UserPresence" VALUES ('drfOayPwwUh12tDrePkJ8', 'd2OayPlUh0qtDrePkJ87t', '2023-09-13 10:00:00', null);`
    await prismaService.$executeRaw`INSERT INTO "public"."UserPresence" VALUES ('qci4ayPwwUh12tDrePkJ8', 'j6-X94_NVjmzVm9QL3k4r', '2023-09-13 11:00:00', null);`
    await prismaService.$executeRaw`INSERT INTO "public"."UserPresence" VALUES ('yui1ayPwwUh12tDrePkJ8', '_U0vTLhbNpjA39Pc7wwtn', '2023-09-13 12:00:00', null);`
    await prismaService.$executeRaw`INSERT INTO "public"."UserPresence" VALUES ('gru1ayPwwUh12tDrePkJ8', '_U0vTLhbNpjA39Pc7wwtn', '2023-09-13 13:00:00', null);`
    await prismaService.$executeRaw`INSERT INTO "public"."UserPresence" VALUES ('poupouPwwUh12tDrePkJ8', '_U0vTLhbNpjA39Pc7wwtn', '2023-09-13 13:00:00', '2023-09-13 14:00:00');`
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
      userId: 'd2OayPlUh0qtDrePkJ87t'
    }

    it('should create a new UserPresence', async () => {
      const userPresence = await userPresenceService.create(userPresenceData)
      expect(userPresence).toBeDefined()
      expect(userPresence.userId).toStrictEqual(userPresenceData.userId)
    })

    it('should update disconnected value', async () => {
      const newUserPresence = await userPresenceService.disconnected(
        'drfOayPwwUh12tDrePkJ8'
      )
      expect(newUserPresence.disconnectedAt).toBeDefined()
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
      expect(foundUserPresence).toHaveLength(3)
    })

    it('user should be connected', async () => {
      const userPresence = await userPresenceService.isConnected(
        'gru1ayPwwUh12tDrePkJ8'
      )
      expect(userPresence).toStrictEqual(true)
    })

    it('user should be disconnected', async () => {
      const userPresence = await userPresenceService.isConnected(
        'poupouPwwUh12tDrePkJ8'
      )
      expect(userPresence).toStrictEqual(false)
    })
  })
})
