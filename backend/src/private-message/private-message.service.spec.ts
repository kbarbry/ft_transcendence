import { Test, TestingModule } from '@nestjs/testing'
import { PrivateMessageService } from './private-message.service'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import {
  ExceptionTryingToUpdatePrivateMessageID,
  ExceptionPrivateMessageYourself,
  ExceptionTryingToUpdateDateMessage,
  ExceptionTryingToUpdateUsersId
} from '../channel/exceptions/private-message.exception'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { cleanDataBase } from '../../test/setup-environment'

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
      ('rtjayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1),
      ('42tX94_NVjmzVm9QL3k4r', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12),
      ('dhPvTLhbNpjA39Pc7wwtn', 'random url', 'bob@42.fr', 'Bobby', 'Babby', null, null, false, 'Online', 'English', 1),
      ('YunzGU-8QlEvmHk8rjNRI', 'random url', 'david@42.fr', 'dav', 'oui', null, null, false, 'Invisble', 'French', 12);`

    //**************************************************//
    //  PRIVATE MESSAGE CREATION
    //**************************************************//
    await prismaService.$executeRaw`
      INSERT INTO
      "public"."PrivateMessage"
      VALUES
      ('in1ayPlUh0qtDrePkJ87t', 'rtjayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in2ayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in3ayPlUh0qtDrePkJ87t', 'rtjayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in4ayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in5ayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in6ayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in7ayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in8ayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in9ayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in10yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in11yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in12yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in13yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in14yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in15yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in16yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in17yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in18yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in19yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in20yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in21yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('in22yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('er10yPlUh0qtDrePkJ87t', 'rtjayPlUh0qtDrePkJ87t', 'YunzGU-8QlEvmHk8rjNRI', 'Ceci est un supermessage', '2023-09-13 10:00:00'),
      ('er11yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'YunzGU-8QlEvmHk8rjNRI', 'Ceci est un supermessage', '2023-09-13 10:00:00');`

    privateMessageData = {
      content: 'This is a wonderfull message',
      createdAt: new Date(),
      receiver: { connect: { id: 'rtjayPlUh0qtDrePkJ87t' } },
      sender: { connect: { id: '42tX94_NVjmzVm9QL3k4r' } }
    }
  })

  afterAll(async () => {
    await cleanDataBase(prismaService)
    await prismaService.$disconnect()
  })

  it('privateMessageService be defined', () => {
    expect(privateMessageService).toBeDefined()
  })
  it('prismaService be defined', () => {
    expect(prismaService).toBeDefined()
  })

  describe('Test Mutation', () => {
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
        'in7ayPlUh0qtDrePkJ87t',
        updatedData
      )
      expect(updatedPrivateMessage.content).toStrictEqual(updatedData.content)
    })

    it('should delete a privateMessage', async () => {
      const deletedMessage = await privateMessageService.delete(
        'in7ayPlUh0qtDrePkJ87t'
      )
      expect(deletedMessage).toBeDefined
    })
  })

  describe('Test Query', () => {
    it('should find a PrivateMessage', async () => {
      const foundPrivateMessage = await privateMessageService.findOne(
        'in7ayPlUh0qtDrePkJ87t'
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

    it('should find all message beetween two UserIds', async () => {
      const HistoricDiscussion = await privateMessageService.findAllMessageWith(
        '42tX94_NVjmzVm9QL3k4r',
        'rtjayPlUh0qtDrePkJ87t'
      )
      expect(HistoricDiscussion.length).toStrictEqual(22)
    })

    it('should find all message beetween two UserIds', async () => {
      const HistoricDiscussion =
        await privateMessageService.findAllMessageWithLiteVersion(
          '42tX94_NVjmzVm9QL3k4r',
          'rtjayPlUh0qtDrePkJ87t'
        )
      expect(HistoricDiscussion.length).toStrictEqual(20)
    })
  })

  describe('Test Error', () => {
    it('update ID ', async () => {
      const updatedata = {
        id: '555'
      }
      await expect(
        privateMessageService.update('er11yPlUh0qtDrePkJ87t', updatedata)
      ).rejects.toThrow(ExceptionTryingToUpdatePrivateMessageID)
    })

    it('creating message with taken ID', async () => {
      await expect(
        prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('in17yPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1);`
      ).rejects.toThrow(PrismaClientKnownRequestError)
    })

    it('Private message to yourself', async () => {
      const wrongData = {
        content: 'This is a wonderfull message',
        createdAt: new Date(),
        receiver: { connect: { id: 'rtjayPlUh0qtDrePkJ87t' } },
        sender: { connect: { id: 'rtjayPlUh0qtDrePkJ87t' } }
      }
      await expect(privateMessageService.create(wrongData)).rejects.toThrow(
        ExceptionPrivateMessageYourself
      )
    })

    it('send a message to someone who do not exist', async () => {
      await expect(
        prismaService.$executeRaw`INSERT INTO "public"."PrivateMessage" VALUES ('er12yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'zunzGU-8QlEvmHk8rjNRI', 'Ceci est un supermessage', '2023-09-13 10:00:00');`
      ).rejects.toThrow(PrismaClientKnownRequestError)
    })

    it('trying to change the date of a message', async () => {
      const wrongUpdatedData = {
        createdAt: '2023-09-13 20:00:00'
      }
      await expect(
        privateMessageService.update('er10yPlUh0qtDrePkJ87t', wrongUpdatedData)
      ).rejects.toThrow(ExceptionTryingToUpdateDateMessage)
    })

    it('trying to update senderId', async () => {
      const wrongData = {
        sender: { connect: { id: 'ttjayPlUh0qtDrePkJ87t' } }
      }
      await expect(
        privateMessageService.update('er10yPlUh0qtDrePkJ87t', wrongData)
      ).rejects.toThrow(ExceptionTryingToUpdateUsersId)
    })

    it('trying to update receiverId', async () => {
      const wrongData = {
        receiver: { connect: { id: 'ttjayPlUh0qtDrePkJ87t' } }
      }
      await expect(
        privateMessageService.update('er10yPlUh0qtDrePkJ87t', wrongData)
      ).rejects.toThrow(ExceptionTryingToUpdateUsersId)
    })
  })
})
