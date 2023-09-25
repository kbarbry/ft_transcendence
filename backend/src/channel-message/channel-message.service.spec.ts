import { Test, TestingModule } from '@nestjs/testing'
import { ChannelMessageService } from './channel-message.service'
import { PrismaService } from 'src/prisma/prisma.service'

//                                                         Table "public.ChannelMessage"
//   Column   |              Type              | Collation | Nullable |      Default      | Storage  | Compression | Stats target | Description
// -----------+--------------------------------+-----------+----------+-------------------+----------+-------------+--------------+-------------
//  id        | text                           |           | not null |                   | extended |             |              |
//  senderId  | text                           |           | not null |                   | extended |             |              |
//  channelId | text                           |           | not null |                   | extended |             |              |
//  content   | text                           |           | not null |                   | extended |             |              |
//  createdAt | timestamp(3) without time zone |           | not null | CURRENT_TIMESTAMP | plain    |             |              |
// Indexes:
//     "ChannelMessage_pkey" PRIMARY KEY, btree (id)
// Foreign-key constraints:
//     "ChannelMessage_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"(id) ON UPDATE CASCADE ON DELETE CASCADE
//     "ChannelMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE RESTRICT

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

  afterAll(async () => {
    prismaService.$executeRaw`DELETE FROM "public"."ChannelMessage"`
    prismaService.$executeRaw`DELETE FROM "public"."Channel"`
    prismaService.$executeRaw`DELETE FROM "public"."User"`
    await prismaService.$disconnect()
  })

  describe('Test channel-message Mutation', () => {
    it('should be defined', async () => {
      expect(channelMessageService).toBeDefined()
    })
  })

  describe('Test Query', () => {
    it('should be defined', async () => {
      expect(channelMessageService).toBeDefined()
    })
  })

  describe('Test Error', () => {
    it('should be defined', async () => {
      expect(channelMessageService).toBeDefined()
    })
  })
})
