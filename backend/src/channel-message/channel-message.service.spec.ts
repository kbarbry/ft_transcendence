import { Test, TestingModule } from '@nestjs/testing'
import { ChannelMessageService } from './channel-message.service'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { ExceptionTryingToUpdateID } from '../user/exceptions/channel-message.exception'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { cleanDataBase } from '../../test/setup-environment'

describe('ChannelMessageService', () => {
  let channelMessageService: ChannelMessageService
  let prismaService: PrismaService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelMessageService, PrismaService]
    }).compile()

    channelMessageService = module.get<ChannelMessageService>(
      ChannelMessageService
    )
    prismaService = module.get<PrismaService>(PrismaService)
  })

  beforeEach(async () => {
    await cleanDataBase(prismaService)

    await prismaService.$executeRaw`INSERT INTO 
      "public"."User" 
      VALUES 
      ('au7d4ec6daffd64a2d4ca', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1),
      ('bu88e59aef615c5df6dfb', 'random url', 'bob.fr', 'Bobby', 'Babby', null, null, false, 'Online', 'English', 1),
      ('cu76f06677b65d3168d6c', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12),
      ('du87734d323ac71c6efbd', 'random url', 'david@42.fr', 'dav', 'oui', null, null, false, 'Invisble', 'French', 12),
      ('eu178ef86d29197b6ffde', 'random url', 'evan@42.fr', 'evee', 'oui', null, null, false, 'Idle', 'Spanish', 36),
      ('fu8d4ff1f6cd647fc171f', 'random url', 'frank@42.fr', 'punisher', 'oui', null, null, false, 'DoNotDisturb', 'Spanish', 9000);`

    await prismaService.$executeRaw`INSERT INTO
      "public"."Channel"
      VALUES
      ('ac7d4ec6daffd64a2d4ca', 'public one', 'avatar url', 'pubic things', null, 'au7d4ec6daffd64a2d4ca', 5, 'Public', '2023-09-13 11:30:42'),
      ('bc88e59aef615c5df6dfb', 'protected one', 'avatar url', 'protected things', null, 'bu88e59aef615c5df6dfb', 5, 'Private', '2023-09-13 11:30:42'),
      ('cc76f06677b65d3168d6c', 'private one', 'avatar url', 'private things', null, 'cu76f06677b65d3168d6c', 5, 'Protected', '2023-09-13 11:30:42');`

    await prismaService.$executeRaw`INSERT INTO
      "public"."ChannelMessage"
      VALUES
      ('am7d4ec6daffd64a2d4ca', 'au7d4ec6daffd64a2d4ca', 'ac7d4ec6daffd64a2d4ca', 'Hello', '2023-09-13 11:30:42'),
      ('bm7d4ec6daffd64a2d4cb', 'bu88e59aef615c5df6dfb', 'ac7d4ec6daffd64a2d4ca', 'Hello you too', '2023-09-13 11:30:42'),
      ('cm7d4ec6daffd64a2d4cc', 'cu76f06677b65d3168d6c', 'ac7d4ec6daffd64a2d4ca', 'Hi lol', '2023-09-13 11:30:42'),
      ('em7d4ec6daffd64a2d4cc', 'du87734d323ac71c6efbd', 'ac7d4ec6daffd64a2d4ca', 'To be deleted', '2023-09-13 11:30:42'),
      ('fm7d4ec6daffd64a2d4cd', 'au7d4ec6daffd64a2d4ca', 'ac7d4ec6daffd64a2d4ca', 'You all are dumb', '2023-09-13 11:30:42'),
      ('gm7d4ec6daffd64a2d4cg', 'du87734d323ac71c6efbd', 'ac7d4ec6daffd64a2d4ca', 'For id update test', '2023-09-13 11:30:42');`
  })

  afterAll(async () => {
    await cleanDataBase(prismaService)
    await prismaService.$disconnect()
  })

  describe('Test channel-message Mutation', () => {
    it('should create a ChannelMessage', async () => {
      const newMessageInput: Prisma.ChannelMessageCreateInput = {
        content: 'New Message from au7d4',
        createdAt: new Date(Date.UTC(2023, 8, 13, 11, 30, 42)),
        user: { connect: { id: 'au7d4ec6daffd64a2d4ca' } },
        channel: { connect: { id: 'ac7d4ec6daffd64a2d4ca' } }
      }

      const messageDB = {
        senderId: 'au7d4ec6daffd64a2d4ca',
        channelId: 'ac7d4ec6daffd64a2d4ca',
        content: 'New Message from au7d4',
        createdAt: new Date(Date.UTC(2023, 8, 13, 11, 30, 42))
      }

      const dbret = await channelMessageService.create(newMessageInput)
      expect(dbret.senderId).toStrictEqual(messageDB.senderId)
      expect(dbret.channelId).toStrictEqual(messageDB.channelId)
      expect(dbret.content).toStrictEqual(messageDB.content)
      expect(dbret.createdAt).toStrictEqual(messageDB.createdAt)
    })

    it('should update a ChannelMessage', async () => {
      const messageUpdateInput: Prisma.ChannelMessageUpdateInput = {
        content: 'You all are nice'
      }
      const messageUpdated = {
        id: 'fm7d4ec6daffd64a2d4cd',
        senderId: 'au7d4ec6daffd64a2d4ca',
        channelId: 'ac7d4ec6daffd64a2d4ca',
        content: 'You all are nice',
        createdAt: new Date(Date.UTC(2023, 8, 13, 11, 30, 42))
      }

      const dbret = await channelMessageService.update(
        'fm7d4ec6daffd64a2d4cd',
        messageUpdateInput
      )

      expect(dbret).toStrictEqual(messageUpdated)
    })

    it('should delete a ChannelMessage', async () => {
      const delMessage = {
        id: 'em7d4ec6daffd64a2d4cc',
        senderId: 'du87734d323ac71c6efbd',
        channelId: 'ac7d4ec6daffd64a2d4ca',
        content: 'To be deleted',
        createdAt: new Date(Date.UTC(2023, 8, 13, 11, 30, 42))
      }
      const dbmessage = await channelMessageService.delete(
        'em7d4ec6daffd64a2d4cc'
      )
      expect(dbmessage).toStrictEqual(delMessage)
    })
  })

  describe('Test Query', () => {
    it("should find a message by it's id", async () => {
      const compMessage = {
        id: 'am7d4ec6daffd64a2d4ca',
        senderId: 'au7d4ec6daffd64a2d4ca',
        channelId: 'ac7d4ec6daffd64a2d4ca',
        content: 'Hello',
        createdAt: new Date(Date.UTC(2023, 8, 13, 11, 30, 42))
      }
      const message = await channelMessageService.findOne(
        'am7d4ec6daffd64a2d4ca'
      )
      expect(message).toStrictEqual(compMessage)
    })

    it('should find an empty ChannelMessage list by finding ChannelMessage of a user in a Channel where he is not', async () => {
      const msgList =
        await channelMessageService.findAllFromChannelIdsAndUserId(
          'bc88e59aef615c5df6dfb',
          'au7d4ec6daffd64a2d4ca'
        )
      expect(msgList.length).toStrictEqual(0)
    })

    it('should find all ChannelMessage from a Channel', async () => {
      const msgList = await channelMessageService.findAllFromChannel(
        'ac7d4ec6daffd64a2d4ca'
      )
      expect(msgList).toBeDefined()
    })

    it('should find all ChannelMessage of a user in a Channel', async () => {
      const msgList =
        await channelMessageService.findAllFromChannelIdsAndUserId(
          'ac7d4ec6daffd64a2d4ca',
          'au7d4ec6daffd64a2d4ca'
        )
      expect(msgList).toBeDefined()
    })
  })

  describe('Test Error', () => {
    it('should update a ChannelMessage id and throw error', async () => {
      const messageUpdateInput: Prisma.ChannelMessageUpdateInput = {
        id: 'random id'
      }
      await expect(
        channelMessageService.update(
          'gm7d4ec6daffd64a2d4cg',
          messageUpdateInput
        )
      ).rejects.toThrow(ExceptionTryingToUpdateID)
    })

    it('should delete non existing ChannelMessage and throw error', async () => {
      await expect(
        channelMessageService.delete('zzzd4ec6daffd64a2d4cc')
      ).rejects.toThrow(PrismaClientKnownRequestError)
    })
  })
})
