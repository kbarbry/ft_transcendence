import { Test, TestingModule } from '@nestjs/testing'
import { ChannelMemberService } from './channel-member.service'
import { PrismaService } from '../prisma/prisma.service'
import { EMemeberType, Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { cleanDataBase } from '../../test/setup-environment'

describe('ChannelMemberService', () => {
  let channelMemberService: ChannelMemberService
  let prismaService: PrismaService
  let channelMemberData: Prisma.ChannelMemberCreateInput

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelMemberService, PrismaService]
    }).compile()

    channelMemberService =
      module.get<ChannelMemberService>(ChannelMemberService)
    prismaService = module.get<PrismaService>(PrismaService)

    //**************************************************//
    //  MAKE IT CLEAN
    //**************************************************//

    await prismaService.$executeRaw`DELETE FROM "public"."Channel";`
    await prismaService.$executeRaw`DELETE FROM "public"."ChannelMember";`
    await prismaService.$executeRaw`DELETE FROM "public"."User";`
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
    //  CHANNEL MEMBER CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelMember" VALUES ('NewAvatarURL', 'WonderfullNickname', '765ayPlUh0qtDrePkJ87t', 'pihayPlUh0qtDrePkJ87t', 'Member', 'true', '2023-09-13 20:00:00', '2023-09-13 10:00:00');`
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelMember" VALUES ('NewAvatarURL', 'WonderfullNickname', 'ftrX94_NVjmzVm9QL3k4r', 'pihayPlUh0qtDrePkJ87t', 'Member', 'true', '2023-09-13 20:00:00', '2023-09-13 10:00:00');`

    channelMemberData = {
      avatarUrl: 'Nice_AVATAAAAR',
      nickname: 'Nick_la_vie',
      createdAt: new Date(),
      type: EMemeberType.Member,
      muted: false,
      juskakan: null,
      user: { connect: { id: '567ayPlUh0qtDrePkJ87t' } },
      channel: { connect: { id: 'pihayPlUh0qtDrePkJ87t' } }
    }
  })

  afterAll(async () => {
    await cleanDataBase(prismaService)
    await prismaService.$disconnect()
  })

  it('channelMemberService should be defined', () => {
    expect(channelMemberService).toBeDefined()
  })
  it('prismaService should be defined', () => {
    expect(prismaService).toBeDefined()
  })

  describe('Test Mutation', () => {
    it('should create ChannelMember', async () => {
      const newChannelMember = await channelMemberService.create(
        channelMemberData
      )
      expect(newChannelMember).toBeDefined
    })
    it('should update Channel-Member', async () => {
      const updatedData = {
        nickname: 'Un_beau_Nickame'
      }
      const updatedChannelMember = await channelMemberService.update(
        '765ayPlUh0qtDrePkJ87t',
        'pihayPlUh0qtDrePkJ87t',
        updatedData
      )
      expect(updatedChannelMember.nickname).toStrictEqual(updatedData.nickname)
    })
    it('should delete a Channel-Member', async () => {
      const deleteChannelMember = await channelMemberService.delete(
        '765ayPlUh0qtDrePkJ87t',
        'pihayPlUh0qtDrePkJ87t'
      )
      expect(deleteChannelMember).toBeDefined
    })
  })
  describe('Test Query', () => {
    it('should find a ChannelMember', async () => {
      const foundChannelMember = await channelMemberService.findOne(
        '765ayPlUh0qtDrePkJ87t',
        'pihayPlUh0qtDrePkJ87t'
      )
      expect(foundChannelMember).toBeDefined
    })
    it('should find all Channel', async () => {
      const channelUsers = await channelMemberService.findAllInChannel(
        'pihayPlUh0qtDrePkJ87t'
      )
      expect(channelUsers).toBeDefined
      expect(channelUsers.length).toBeGreaterThanOrEqual(1)
    })
  })
  describe('Test Error', () => {
    it('id already created', () => {
      expect(async () => {
        await channelMemberService.create(channelMemberData)
        await channelMemberService.create(channelMemberData)
      }).rejects.toThrow(PrismaClientKnownRequestError)
    })
    it('create with invalid channel data', () => {
      expect(async () => {
        const invalidData = {
          avatarUrl: 'Nice_AVATAAAAR',
          nickname: 'Nick_la_vie',
          createdAt: new Date(),
          type: EMemeberType.Member,
          muted: false,
          juskakan: null,
          user: { connect: { id: '567ayPlUh0qtDrePkJ87t' } },
          channel: { connect: { id: '666' } }
        }
        await channelMemberService.create(invalidData)
      }).rejects.toThrow(PrismaClientKnownRequestError)
    })
    it('create with invalid channel data', () => {
      expect(async () => {
        const invalidData = {
          avatarUrl: 'Nice_AVATAAAAR',
          nickname: 'Nick_la_vie',
          createdAt: new Date(),
          type: EMemeberType.Member,
          muted: false,
          juskakan: null,
          user: { connect: { id: '666' } },
          channel: { connect: { id: 'pihayPlUh0qtDrePkJ87t' } }
        }
        await channelMemberService.create(invalidData)
      }).rejects.toThrow(PrismaClientKnownRequestError)
    })
  })
})
