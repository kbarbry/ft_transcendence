import { Test, TestingModule } from '@nestjs/testing'
import { ChannelInvitedService } from './channel-invited.service'
import { PrismaService } from '../prisma/prisma.service'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { cleanDataBase } from '../../test/setup-environment'

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
    //  CHANNEL INVITED CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelInvited" VALUES ('765ayPlUh0qtDrePkJ87t', 'pihayPlUh0qtDrePkJ87t');`
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelInvited" VALUES ('ftrX94_NVjmzVm9QL3k4r', 'pihayPlUh0qtDrePkJ87t');`
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
      const resRequest = await channelInvitedService.create({
        user: { connect: { id: 'fdpvTLhbNpjA39Pc7wwtn' } },
        channel: { connect: { id: 'pihayPlUh0qtDrePkJ87t' } }
      })
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
          user: { connect: { id: '765ayPlUh0qtDrePkJ87t' } },
          channel: { connect: { id: 'pihayPlUh0qtDrePkJ87t' } }
        })
      ).rejects.toThrow(PrismaClientKnownRequestError)
    })

    it('create with invalid channel data', async () => {
      await expect(
        channelInvitedService.create({
          user: { connect: { id: 'fdpvTLhbNpjA39Pc7wwtn' } },
          channel: { connect: { id: '666' } }
        })
      ).rejects.toThrow(PrismaClientKnownRequestError)
    })

    it('create with invalid user data', async () => {
      await expect(
        channelInvitedService.create({
          user: { connect: { id: '666' } },
          channel: { connect: { id: 'pihayPlUh0qtDrePkJ87t' } }
        })
      ).rejects.toThrow(PrismaClientKnownRequestError)
    })
  })
})
