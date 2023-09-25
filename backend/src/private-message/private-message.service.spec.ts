import { Test, TestingModule } from '@nestjs/testing'
import { PrivateMessageService } from './private-message.service'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'

describe('PrivateMessageService', () => {
  let privateMessageService: PrivateMessageService
  let prismaService: PrismaService
  let privateMessageData: Prisma.PrivateMessageCreateInput

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrivateMessageService, PrismaService]
    }).compile()

    privateMessageService = module.get<PrivateMessageService>(
      PrivateMessageService
    )
    prismaService = module.get<PrismaService>(PrismaService)

    //**************************************************//
    //  PREPARE DATABASE
    //**************************************************//

    await prismaService.$executeRaw`DELETE FROM "public"."RelationFriend";`
    await prismaService.$executeRaw`DELETE FROM "public"."RelationBlocked";`
    await prismaService.$executeRaw`DELETE FROM "public"."RelationRequests";`
    await prismaService.$executeRaw`DELETE FROM "public"."UserPresence";`
    await prismaService.$executeRaw`DELETE FROM "public"."GameStat";`
    await prismaService.$executeRaw`DELETE FROM "public"."Channel";`
    await prismaService.$executeRaw`DELETE FROM "public"."ChannelMember";`
    await prismaService.$executeRaw`DELETE FROM "public"."ChannelMessage";`
    await prismaService.$executeRaw`DELETE FROM "public"."PrivateMessage";`
    await prismaService.$executeRaw`DELETE FROM "public"."User";`
  })

  beforeEach(async () => {
    //**************************************************//
    //  MAKE IT CLEAN
    //**************************************************//

    await prismaService.$executeRaw`DELETE FROM "public"."PrivateMessage";`
    await prismaService.$executeRaw`DELETE FROM "public"."User";`

    //**************************************************//
    //  USER CREATION
    //**************************************************//

    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('rtjayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('42tX94_NVjmzVm9QL3k4r', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('dhPvTLhbNpjA39Pc7wwtn', 'random url', 'bob@42.fr', 'Bobby', 'Babby', null, null, false, 'Online', 'English', 1);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('YunzGU-8QlEvmHk8rjNRI', 'random url', 'david@42.fr', 'dav', 'oui', null, null, false, 'Invisble', 'French', 12);`

    //**************************************************//
    //  PRIVATE MESSAGE CREATION
    //**************************************************//

    await prismaService.$executeRaw`INSERT INTO "public"."PrivateMessage" VALUES ('er5ayPlUh0qtDrePkJ87t', 'rtjayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'Ceci est un supermessage', '2023-09-13 10:00:00');`
    await prismaService.$executeRaw`INSERT INTO "public"."PrivateMessage" VALUES ('er6ayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00');`
    await prismaService.$executeRaw`INSERT INTO "public"."PrivateMessage" VALUES ('er7ayPlUh0qtDrePkJ87t', 'rtjayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'Ceci est un supermessage', '2023-09-13 10:00:00');`
    await prismaService.$executeRaw`INSERT INTO "public"."PrivateMessage" VALUES ('er8ayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00');`
    await prismaService.$executeRaw`INSERT INTO "public"."PrivateMessage" VALUES ('er9ayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00');`

    privateMessageData = {
      content: 'This is a wonderfull message',
      createdAt: new Date(),
      receiver: { connect: { id: 'rtjayPlUh0qtDrePkJ87t' } },
      sender: { connect: { id: '42tX94_NVjmzVm9QL3k4r' } }
    }
  })
  it('should be defined', () => {
    expect(privateMessageService).toBeDefined()
  })
  it('should be defined', () => {
    expect(prismaService).toBeDefined()
  })

  describe('Test mutation', () => {
    it('Should create a PrivateMessage', async () => {
      const newPrivateMessage = await privateMessageService.create(
        privateMessageData
      )
      expect(newPrivateMessage).toBeDefined
    })
    it('should update a private message', async () => {
      const updatedData = {
        content: 'My updated message!'
      }
      const updatedPrivateMessage = await privateMessageService.update(
        'er7ayPlUh0qtDrePkJ87t',
        updatedData
      )
      expect(updatedPrivateMessage.content).toStrictEqual(updatedData.content)
    })
    it('should delete a privateMessage', async () => {
      const deletedMessage = await privateMessageService.delete(
        'er7ayPlUh0qtDrePkJ87t'
      )
      expect(deletedMessage).toBeDefined
    })
  })
  describe('Test query', () => {
    it('should find a PrivateMessage', async () => {
      const foundPrivateMessage = await privateMessageService.findOne(
        'er7ayPlUh0qtDrePkJ87t'
      )
      expect(foundPrivateMessage).toBeDefined
    })
    it('should find all message receie or send by an user with userId', async () => {
      const allprivateMessage = await privateMessageService.findAll(
        'rtjayPlUh0qtDrePkJ87t'
      )
      expect(allprivateMessage).toBeDefined
      expect(allprivateMessage.length).toBeGreaterThan(2)
    })
  })
})
