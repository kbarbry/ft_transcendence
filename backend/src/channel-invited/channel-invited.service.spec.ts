import { Test, TestingModule } from '@nestjs/testing'
import { ChannelInvitedService } from './channel-invited.service'
import { PrismaService } from '../prisma/prisma.service'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { cleanDataBase } from '../../test/setup-environment'
import {
  ExceptionChannelIsNotInProtectedMode,
  ExceptionUserAlreadyInChannel
} from '../channel/exceptions/invited.exception'
import { ExceptionUserBlockedInChannel } from '../channel/exceptions/blocked.exception'

describe('ChannelInvitedService', () => {
  let channelInvitedService: ChannelInvitedService
  let prismaService: PrismaService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelInvitedService, PrismaService]
    }).compile()

    channelInvitedService = module.get<ChannelInvitedService>(
      ChannelInvitedService
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
      ('765ayPlUh0qtDrePkJ87t', 'random url', 'alscsed@42.fr', 'Ally', 'oui', false, false, false, false, 'Online', 'English', 1),
      ('ftrX94_NVjmzVm9QL3k4r', 'random url', 'charlie@42.fr', 'Chacha', 'oui', false, false, false, false, 'Invisble', 'French', 12),
      ('fdpvTLhbNpjA39Pc7wwtn', 'random url', 'bob@42.fr', 'Bobby', 'Babby', false, false, false, false, 'Online', 'English', 1),
      ('wrtzGU-8QlEvmHk8rjNRI', 'random url', 'david@42.fr', 'dav', 'oui', false, false, false, false, 'Invisble', 'French', 12),
      ('567ayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Awdy', 'oui', false, false, false, false, 'Online', 'English', 1),
      ('ec178ef86d29197b6ffd-', 'random url', 'evan@42.fr', 'evee', 'oui', false, false, false, false, 'Idle', 'Spanish', 36),
      ('e28d4ff1f6cd647fc171-', 'random url', 'frank@42.fr', 'punisher', 'oui', false, false, false, false, 'DoNotDisturb', 'Spanish', 9000);`
    //**************************************************//
    //  CHANNEL CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO "public"."Channel" VALUES ('pihayPlUh0qtDrePkJ87t', 'random name', 'randomURL', 'TopicName', 'Password123', '567ayPlUh0qtDrePkJ87t', 50, 'Protected', '2023-09-13 10:00:00');`
    await prismaService.$executeRaw`INSERT INTO "public"."Channel" VALUES ('RDaquZM1MRu7A1btyFiNb', 'random name2', 'randomURL', 'TopicName', 'Password123', '567ayPlUh0qtDrePkJ87t', 50, 'Public', '2023-09-13 10:00:00');`

    //**************************************************//
    //  CHANNEL INVITED CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelInvited" VALUES ('765ayPlUh0qtDrePkJ87t', 'pihayPlUh0qtDrePkJ87t');`
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelInvited" VALUES ('ftrX94_NVjmzVm9QL3k4r', 'pihayPlUh0qtDrePkJ87t');`

    //**************************************************//
    //  CHANNEL BLOCKED CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelBlocked" VALUES ('ec178ef86d29197b6ffd-', 'pihayPlUh0qtDrePkJ87t');`

    //**************************************************//
    //  CHANNEL MEMBER CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelMember" VALUES ('NewAvatarURL', 'WonderfullNickname', 'e28d4ff1f6cd647fc171-', 'pihayPlUh0qtDrePkJ87t', 'Member', 'true', '2023-09-13 10:00:00');`
  })

  afterAll(async () => {
    await cleanDataBase(prismaService)
    await prismaService.$disconnect()
  })

  it('channelInvitedService should be defined', () => {
    expect(channelInvitedService).toBeDefined()
  })

  it('prismaService should be defined', () => {
    expect(prismaService).toBeDefined()
  })

  describe('Test Mutation', () => {
    it('should create ChannelInvited', async () => {
      const channelInvitedInput = {
        userId: 'fdpvTLhbNpjA39Pc7wwtn',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }
      const resRequest = await channelInvitedService.create(channelInvitedInput)
      const expectedRes = {
        userId: 'fdpvTLhbNpjA39Pc7wwtn',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }
      expect(resRequest).toStrictEqual(expectedRes)
    })

    it('should delete a ChannelInvited', async () => {
      const resRequest = await channelInvitedService.delete(
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
    it('should find a ChannelInvited', async () => {
      const resRequest = await channelInvitedService.findOne(
        '765ayPlUh0qtDrePkJ87t',
        'pihayPlUh0qtDrePkJ87t'
      )
      const expectedRes = {
        userId: '765ayPlUh0qtDrePkJ87t',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }
      expect(resRequest).toStrictEqual(expectedRes)
    })

    it('should find all ChannelInvited', async () => {
      const resRequest = await channelInvitedService.findAllInChannel(
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
        channelInvitedService.create({
          userId: '765ayPlUh0qtDrePkJ87t',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        })
      ).rejects.toThrow(PrismaClientKnownRequestError)
    })

    it('create with invalid channel data', async () => {
      await expect(
        channelInvitedService.create({
          userId: 'fdpvTLhbNpjA39Pc7wwtn',
          channelId: '666'
        })
      ).rejects.toThrow(PrismaClientKnownRequestError)
    })

    it('create with invalid user data', async () => {
      await expect(
        channelInvitedService.create({
          userId: '666',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        })
      ).rejects.toThrow(PrismaClientKnownRequestError)
    })

    it('trying to invite in a non protected channel', async () => {
      await expect(
        channelInvitedService.create({
          userId: '765ayPlUh0qtDrePkJ87t',
          channelId: 'RDaquZM1MRu7A1btyFiNb'
        })
      ).rejects.toThrow(ExceptionChannelIsNotInProtectedMode)
    })

    it('trying to invite a user already in the channel', async () => {
      await expect(
        channelInvitedService.create({
          userId: 'e28d4ff1f6cd647fc171-',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        })
      ).rejects.toThrow(ExceptionUserAlreadyInChannel)
    })

    it('trying to invite a user blocked in the channel', async () => {
      await expect(
        channelInvitedService.create({
          userId: 'ec178ef86d29197b6ffd-',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        })
      ).rejects.toThrow(ExceptionUserBlockedInChannel)
    })
  })
})
