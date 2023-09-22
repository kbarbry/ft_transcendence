import { Test, TestingModule } from '@nestjs/testing'
import { ChannelService } from './channel.service'
import { PrismaService } from '../prisma/prisma.service'
import { EChannelType, Prisma } from '@prisma/client'

describe('ChannelService', () => {
  let channelService: ChannelService
  let prismaService: PrismaService
  let channelData: Prisma.ChannelCreateInput

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelService, PrismaService]
    }).compile()

    prismaService = module.get<PrismaService>(PrismaService)
    channelService = module.get<ChannelService>(ChannelService)
  })

  beforeEach(async () => {
    //**************************************************//
    //  MAKE IT CLEAN
    //**************************************************//

    await prismaService.$executeRaw`DELETE FROM "public"."Channel";`
    await prismaService.$executeRaw`DELETE FROM "public"."User";`

    //**************************************************//
    //  USER CREATION
    //**************************************************//

    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('567ayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1);`

    //**************************************************//
    //  CHANNEL CREATION
    //**************************************************//

    await prismaService.$executeRaw`INSERT INTO "public"."Channel" VALUES ('pihayPlUh0qtDrePkJ87t', 'random name', 'randomURL', 'TopicName', 'Password123', '567ayPlUh0qtDrePkJ87t', 50, 'Public', '2023-09-13 10:00:00');`
    await prismaService.$executeRaw`INSERT INTO "public"."Channel" VALUES ('333ayPlUh0qtDrePkJ87t', 'random name', 'randomURL', 'TopicName', 'Password123', '567ayPlUh0qtDrePkJ87t', 50, 'Public', '2023-09-13 10:00:00');`

    channelData = {
      name: 'testName',
      avatarUrl: 'NiceURL',
      topic: 'WonderfullRopic',
      password: 'NicePassword',
      maxUsers: 50,
      type: EChannelType.Public,
      createdAt: new Date(),
      owner: { connect: { id: '567ayPlUh0qtDrePkJ87t' } }
    }
  })
  afterAll(async () => {
    await prismaService.$disconnect()
  })

  describe('Test Channel Mutation', () => {
    it('should be defined', () => {
      expect(channelService).toBeDefined()
    })
    it('should create a channel', async () => {
      const newChannel = await channelService.create(channelData)
      expect(newChannel).toBeDefined
    })
    it('should update a channel', async () => {
      const updatedata = {
        topic: 'SadTopicName'
      }
      const updatedChannel = await channelService.update(
        'pihayPlUh0qtDrePkJ87t',
        updatedata
      )
      expect(updatedChannel.topic).toStrictEqual(updatedata.topic)
    })
    it('should delete a Channel', async () => {
      const deletedChannel = await channelService.delete(
        'pihayPlUh0qtDrePkJ87t'
      )
      expect(deletedChannel).toBeDefined
    })
  })
  describe('Test query', () => {
    it('should fin a Channel', async () => {
      const foundChannel = await channelService.findOne('pihayPlUh0qtDrePkJ87t')
      expect(foundChannel).toBeDefined
      expect(foundChannel?.ownerId).toStrictEqual('567ayPlUh0qtDrePkJ87t')
    })
    it('should return the ownerID of the Channel', async () => {
      const ownerID = await channelService.findOwner('pihayPlUh0qtDrePkJ87t')
      expect(ownerID).toStrictEqual('567ayPlUh0qtDrePkJ87t')
    })
    it('should find all Channel owned by an User', async () => {
      const channels = await channelService.findAllChannelOfOwner(
        '567ayPlUh0qtDrePkJ87t'
      )
      expect(channels?.length).toBeGreaterThan(1)
    })
  })
})
