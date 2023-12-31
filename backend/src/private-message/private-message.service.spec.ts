import { Test, TestingModule } from '@nestjs/testing'
import { PrivateMessageService } from './private-message.service'
import { PrismaService } from '../prisma/prisma.service'
import { ExceptionPrivateMessageYourself } from '../channel/exceptions/private-message.exception'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { cleanDataBase } from '../../test/setup-environment'
import { CreatePrivateMessageInput } from './dto/create-private-message.input'
import { UpdatePrivateMessageInput } from './dto/update-private-message.input'

describe('PrivateMessageService', () => {
  let privateMessageService: PrivateMessageService
  let prismaService: PrismaService

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
      ('rtjayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Ally', 'oui', false, false, false, false, 'Online', 'English', 1),
      ('42tX94_NVjmzVm9QL3k4r', 'random url', 'charlie@42.fr', 'Chacha', 'oui', false, false, false, false, 'Invisble', 'French', 12),
      ('dhPvTLhbNpjA39Pc7wwtn', 'random url', 'bob@42.fr', 'Bobby', 'Babby', false, false, false, false, 'Online', 'English', 1),
      ('YunzGU-8QlEvmHk8rjNRI', 'random url', 'david@42.fr', 'dav', 'oui', false, false, false, false, 'Invisble', 'French', 12);`

    //**************************************************//
    //  PRIVATE MESSAGE CREATION
    //**************************************************//
    await prismaService.$executeRaw`
      INSERT INTO
      "public"."PrivateMessage"
      ("id", "senderId", "receiverId", "content", "updatedAt", "createdAt")
      VALUES
      ('in1ayPlUh0qtDrePkJ87t', 'rtjayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in2ayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in3ayPlUh0qtDrePkJ87t', 'rtjayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in4ayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in5ayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in6ayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in7ayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in8ayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in9ayPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in10yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in11yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in12yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in13yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in14yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in15yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in16yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in17yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in18yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in19yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in20yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in21yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('in22yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'rtjayPlUh0qtDrePkJ87t', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('er10yPlUh0qtDrePkJ87t', 'rtjayPlUh0qtDrePkJ87t', 'YunzGU-8QlEvmHk8rjNRI', 'Ceci est un supermessage', null, '2023-09-13 10:00:00'),
      ('er11yPlUh0qtDrePkJ87t', '42tX94_NVjmzVm9QL3k4r', 'YunzGU-8QlEvmHk8rjNRI', 'Ceci est un supermessage', null, '2023-09-13 10:00:00');`
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
      const privateMessageData: CreatePrivateMessageInput = {
        content: 'This is a wonderfull message',
        receiverId: 'rtjayPlUh0qtDrePkJ87t',
        senderId: '42tX94_NVjmzVm9QL3k4r'
      }
      const newPrivateMessage = await privateMessageService.create(
        privateMessageData
      )
      expect(newPrivateMessage).toBeDefined()
    })

    it('should update a private message', async () => {
      const updatedData: UpdatePrivateMessageInput = {
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
      expect(deletedMessage).toBeDefined()
    })

    it('should update the updatedAt', async () => {
      const updatedata = {
        content: 'updated content'
      }
      const updatedPrivateMessage = await privateMessageService.update(
        'in7ayPlUh0qtDrePkJ87t',
        updatedata
      )

      const difference =
        updatedPrivateMessage.updatedAt === updatedPrivateMessage.createdAt

      expect(difference).toStrictEqual(false)
    })
  })

  describe('Test Query', () => {
    it('should find a PrivateMessage', async () => {
      const foundPrivateMessage = await privateMessageService.findOne(
        'in7ayPlUh0qtDrePkJ87t'
      )
      expect(foundPrivateMessage).toBeDefined()
    })

    it('should find all message beetween two UserIds', async () => {
      const HistoricDiscussion = await privateMessageService.findAllMessageWith(
        '42tX94_NVjmzVm9QL3k4r',
        'rtjayPlUh0qtDrePkJ87t'
      )
      expect(HistoricDiscussion.length).toStrictEqual(22)
    })

    it('should find all message that contains the needle', async () => {
      const foundPrivateMessage =
        await privateMessageService.findPrivateMessageContain(
          '42tX94_NVjmzVm9QL3k4r',
          'rtjayPlUh0qtDrePkJ87t',
          'Ceci'
        )
      expect(foundPrivateMessage?.length).toStrictEqual(22)
    })
  })

  describe('Test Error', () => {
    it('Create a PrivateMessage with same sender and receiver and throw error', async () => {
      const wrongData: CreatePrivateMessageInput = {
        content: 'This is a wonderfull message',
        receiverId: 'rtjayPlUh0qtDrePkJ87t',
        senderId: 'rtjayPlUh0qtDrePkJ87t'
      }
      await expect(privateMessageService.create(wrongData)).rejects.toThrow(
        ExceptionPrivateMessageYourself
      )
    })

    it('Create a message with non existing receiver id and throw error', async () => {
      const wrongData: CreatePrivateMessageInput = {
        content: 'This is a wonderfull message',
        receiverId: 'non existing id',
        senderId: 'rtjayPlUh0qtDrePkJ87t'
      }
      await expect(privateMessageService.create(wrongData)).rejects.toThrow(
        PrismaClientKnownRequestError
      )
    })

    it('Create a message with non existing sender id and throw error', async () => {
      const wrongData: CreatePrivateMessageInput = {
        content: 'This is a wonderfull message',
        receiverId: 'non existing id',
        senderId: 'non existing sender id'
      }
      await expect(privateMessageService.create(wrongData)).rejects.toThrow(
        PrismaClientKnownRequestError
      )
    })
  })
})
