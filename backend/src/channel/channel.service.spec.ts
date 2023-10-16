import { Test, TestingModule } from '@nestjs/testing'
import { ChannelService } from './channel.service'
import { PrismaService } from '../prisma/prisma.service'
import { EChannelType } from '@prisma/client'
import { cleanDataBase } from '../../test/setup-environment'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { CreateChannelInput } from './dto/create-channel.input'

describe('ChannelService', () => {
  let channelService: ChannelService
  let prismaService: PrismaService
  let channelData: CreateChannelInput

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
    await cleanDataBase(prismaService)

    //**************************************************//
    //  USER CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('564ayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('000ayPlUh0qtDrePkJ87t', 'random url', 'alfredo@42.fr', 'Allo', 'oui', null, null, false, 'Online', 'English', 1);`

    //**************************************************//
    //  CHANNEL CREATION
    //**************************************************//
    await prismaService.$executeRaw`
      INSERT INTO
      "public"."Channel"
      VALUES
      ('pihayPlUh0qtDrePkJ87t', 'Name', 'randomURL', 'TopicName', 'Password123', '564ayPlUh0qtDrePkJ87t', 50, 'Public', '2023-09-13 10:00:00'),
      ('333ayPlUh0qtDrePkJ87t', 'random name', 'randomURL', 'TopicName', 'Password123', '564ayPlUh0qtDrePkJ87t', 50, 'Public', '2023-09-13 10:00:00');`

    channelData = {
      name: 'testName',
      ownerId: '564ayPlUh0qtDrePkJ87t'
    }
  })

  afterAll(async () => {
    // await cleanDataBase(prismaService)
    await prismaService.$disconnect()
  })

  it('channelService should be defined', () => {
    expect(channelService).toBeDefined()
  })

  it('prismaService should be defined', () => {
    expect(prismaService).toBeDefined()
  })

  describe('Test Mutation', () => {
    it('should create a channel', async () => {
      const newChannel = await channelService.create(channelData)
      expect(newChannel).toBeDefined()
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
      expect(deletedChannel).toBeDefined()
    })
  })
  describe('Test Query', () => {
    it('should find a Channel', async () => {
      const foundChannel = await channelService.findOne('pihayPlUh0qtDrePkJ87t')
      expect(foundChannel).toBeDefined()
      expect(foundChannel?.ownerId).toStrictEqual('564ayPlUh0qtDrePkJ87t')
    })

    it('should return the ownerID of the Channel', async () => {
      const ownerID = await channelService.findOwner('pihayPlUh0qtDrePkJ87t')
      expect(ownerID).toStrictEqual('564ayPlUh0qtDrePkJ87t')
    })
    it('should modify ownerID', async () => {
      const ownerID = await channelService.updateOwner(
        'pihayPlUh0qtDrePkJ87t',
        { ownerId: '000ayPlUh0qtDrePkJ87t' }
      )
      expect(ownerID).toBeDefined()
    })
    it('should return the ownerID of the Channel', async () => {
      const ownerID = await channelService.findOwner('pihayPlUh0qtDrePkJ87t')
      expect(ownerID).toStrictEqual('564ayPlUh0qtDrePkJ87t')
    })

    it('should find all Channel owned by an User', async () => {
      const channels = await channelService.findAllChannelOfOwner(
        '564ayPlUh0qtDrePkJ87t'
      )
      expect(channels?.length).toBeGreaterThan(1)
    })
  })

  describe('Test Error', () => {
    it('Delete an already deleted channel', async () => {
      await expect(channelService.delete('98217398')).rejects.toThrow(
        PrismaClientKnownRequestError
      )
    })

    it('Trying to make a channel with already taken name', async () => {
      const channelData: CreateChannelInput = {
        name: 'random name',
        avatarUrl: 'NiceURL',
        topic: 'WonderfullRopic',
        maxUsers: 30,
        type: EChannelType.Public,
        ownerId: '564ayPlUh0qtDrePkJ87t'
      }
      await expect(channelService.create(channelData)).rejects.toThrowError(
        PrismaClientKnownRequestError
      )
    })

    it('try to update with already taken name', async () => {
      const updatedData = { name: 'random name' }
      await expect(
        channelService.update('pihayPlUh0qtDrePkJ87t', updatedData)
      ).rejects.toThrowError(PrismaClientKnownRequestError)
    })

    it('Try to change the name of non-existant channel', async () => {
      const updatedData = { name: 'new_name' }
      await expect(
        channelService.update('pih1yPlUh0qtDrePkJ87t', updatedData)
      ).rejects.toThrow(PrismaClientKnownRequestError)
    })
  })
})
