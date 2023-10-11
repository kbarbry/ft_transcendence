import { Test, TestingModule } from '@nestjs/testing'
import { ChannelBlockedService } from './channel-blocked.service'
import { PrismaService } from '../prisma/prisma.service'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { cleanDataBase } from '../../test/setup-environment'
import { ExceptionTryingToBlockChannelOwner } from '../channel/exceptions/blocked.exception'
import { CreateChannelBlockedInput } from './dto/create-channel-blocked.input'
describe('ChannelBlockedService', () => {
  let channelBlockedService: ChannelBlockedService
  let prismaService: PrismaService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelBlockedService, PrismaService]
    }).compile()

    channelBlockedService = module.get<ChannelBlockedService>(
      ChannelBlockedService
    )
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
      ('765ayPlUh0qtDrePkJ87t', 'random url', 'alscsed@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1),
      ('ftrX94_NVjmzVm9QL3k4r', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12),
      ('fdpvTLhbNpjA39Pc7wwtn', 'random url', 'bob@42.fr', 'Bobby', 'Babby', null, null, false, 'Online', 'English', 1),
      ('wrtzGU-8QlEvmHk8rjNRI', 'random url', 'david@42.fr', 'dav', 'oui', null, null, false, 'Invisble', 'French', 12),
      ('567ayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Awdy', 'oui', null, null, false, 'Online', 'English', 1);`
    //**************************************************//
    //  CHANNEL CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO "public"."Channel" VALUES ('pihayPlUh0qtDrePkJ87t', 'random name', 'randomURL', 'TopicName', 'Password123', '567ayPlUh0qtDrePkJ87t', 50, 'Public', '2023-09-13 10:00:00');`

    //**************************************************//
    //  CHANNEL BLOCKED CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelBlocked" VALUES ('765ayPlUh0qtDrePkJ87t', 'pihayPlUh0qtDrePkJ87t');`
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelBlocked" VALUES ('ftrX94_NVjmzVm9QL3k4r', 'pihayPlUh0qtDrePkJ87t');`
  })

  afterAll(async () => {
    await cleanDataBase(prismaService)
    await prismaService.$disconnect()
  })

  it('channelBlockedService should be defined', () => {
    expect(channelBlockedService).toBeDefined()
  })

  it('prismaService should be defined', () => {
    expect(prismaService).toBeDefined()
  })

  describe('Test Mutation', () => {
    it('should create ChannelBlocked', async () => {
      const channelBlockedInput = new CreateChannelBlockedInput()
      channelBlockedInput.userId = 'fdpvTLhbNpjA39Pc7wwtn'
      channelBlockedInput.channelId = 'pihayPlUh0qtDrePkJ87t'
      const res = await channelBlockedService.create(channelBlockedInput)
      const expectedRes = {
        userId: 'fdpvTLhbNpjA39Pc7wwtn',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }
      expect(res).toStrictEqual(expectedRes)
    })

    it('should delete a ChannelBlocked', async () => {
      const resRequest = await channelBlockedService.delete(
        '765ayPlUh0qtDrePkJ87t',
        'pihayPlUh0qtDrePkJ87t'
      )
      const expectedRes = {
        userId: '765ayPlUh0qtDrePkJ87t',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }
      expect(resRequest).toStrictEqual(expectedRes)
    })
  })
  describe('Test Query', () => {
    it('should find a ChannelBlocked', async () => {
      const resRequest = await channelBlockedService.findOne(
        '765ayPlUh0qtDrePkJ87t',
        'pihayPlUh0qtDrePkJ87t'
      )
      const expectedRes = {
        userId: '765ayPlUh0qtDrePkJ87t',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }
      expect(resRequest).toStrictEqual(expectedRes)
    })

    it('should find all ChannelBlocked', async () => {
      const resRequest = await channelBlockedService.findAllInChannel(
        'pihayPlUh0qtDrePkJ87t'
      )
      const expectedRes = [
        {
          userId: '765ayPlUh0qtDrePkJ87t',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        },
        {
          userId: 'ftrX94_NVjmzVm9QL3k4r',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
      ]
      expect(resRequest).toStrictEqual(expectedRes)
    })
  })
  describe('Test Error', () => {
    it('id already created', async () => {
      await expect(
        channelBlockedService.create({
          userId: '765ayPlUh0qtDrePkJ87t',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        })
      ).rejects.toThrow(PrismaClientKnownRequestError)
    })

    it('create with invalid channel data', async () => {
      await expect(
        channelBlockedService.create({
          userId: 'fdpvTLhbNpjA39Pc7wwtn',
          channelId: '666'
        })
      ).rejects.toThrow(PrismaClientKnownRequestError)
    })

    it('create with invalid user data', async () => {
      await expect(
        channelBlockedService.create({
          userId: '666',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        })
      ).rejects.toThrow(PrismaClientKnownRequestError)
    })

    it('trying to block the owner', async () => {
      await expect(
        channelBlockedService.create({
          userId: '567ayPlUh0qtDrePkJ87t',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        })
      ).rejects.toThrow(ExceptionTryingToBlockChannelOwner)
    })
  })
})
