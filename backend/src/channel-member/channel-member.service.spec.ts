import { Test, TestingModule } from '@nestjs/testing'
import { ChannelMemberService } from './channel-member.service'
import { PrismaService } from '../prisma/prisma.service'
import { EMemberType } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { cleanDataBase } from '../../test/setup-environment'
import { ChannelBlockedService } from '../channel-blocked/channel-blocked.service'
import { ChannelInvitedService } from '../channel-invited/channel-invited.service'
import { ExceptionUserBlockedInChannel } from '../channel/exceptions/blocked.exception'
import { ChannelService } from '../channel/channel.service'
import { ExceptionUserNotInvited } from '../channel/exceptions/invited.exception'
import { ExceptionInvalidMaxUserInChannel } from '../channel/exceptions/channel.exception'
import {
  ExceptionTryingToMakeAdminAnAdmin,
  ExceptionTryingToMuteAMuted,
  ExceptionTryingToUnmuteAnUnmuted
} from '../channel/exceptions/channel-member.exceptions'

describe('ChannelMemberService', () => {
  let channelMemberService: ChannelMemberService
  let channelBlockedService: ChannelBlockedService
  let channelInvitedService: ChannelInvitedService
  let channelService: ChannelService
  let prismaService: PrismaService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelMemberService,
        PrismaService,
        ChannelBlockedService,
        ChannelInvitedService,
        ChannelService
      ]
    }).compile()

    channelMemberService =
      module.get<ChannelMemberService>(ChannelMemberService)
    channelBlockedService = module.get<ChannelBlockedService>(
      ChannelBlockedService
    )
    channelInvitedService = module.get<ChannelInvitedService>(
      ChannelInvitedService
    )
    channelService = module.get<ChannelService>(ChannelService)
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
    await prismaService.$executeRaw`INSERT INTO "public"."Channel" VALUES ('RDaquZM1MRu7A1btyFiNb', 'random name2', 'randomURL', 'TopicName', 'Password123', '567ayPlUh0qtDrePkJ87t', 50, 'Protected', '2023-09-13 10:00:00');`
    await prismaService.$executeRaw`INSERT INTO "public"."Channel" VALUES ('dxb50bMlJwngXPUyc6yNX', 'random name3', 'randomURL', 'TopicName', 'Password123', '567ayPlUh0qtDrePkJ87t', 3, 'Public', '2023-09-13 10:00:00');`

    //**************************************************//
    //  CHANNEL MEMBER CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelMember" VALUES ('NewAvatarURL', 'WonderfullNickname', '765ayPlUh0qtDrePkJ87t', 'pihayPlUh0qtDrePkJ87t', 'Member', false, '2023-09-13 20:00:00', '2023-09-13 10:00:00');`
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelMember" VALUES ('NewAvatarURL', 'WonderfullNickname', 'ftrX94_NVjmzVm9QL3k4r', 'pihayPlUh0qtDrePkJ87t', 'Member', false, '2023-09-13 20:00:00', '2023-09-13 10:00:00');`
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelMember" VALUES ('NewAvatarURL', 'WonderfullNickname', '765ayPlUh0qtDrePkJ87t', 'dxb50bMlJwngXPUyc6yNX', 'Member', false, '2023-09-13 20:00:00', '2023-09-13 10:00:00');`
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelMember" VALUES ('NewAvatarURL', 'WonderfullNickname', 'ftrX94_NVjmzVm9QL3k4r', 'dxb50bMlJwngXPUyc6yNX', 'Member', true, '2023-09-13 20:00:00', '2023-09-13 10:00:00');`
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelMember" VALUES ('NewAvatarURL', 'WonderfullNickname', 'fdpvTLhbNpjA39Pc7wwtn', 'dxb50bMlJwngXPUyc6yNX', 'Admin', false, '2023-09-13 20:00:00', '2023-09-13 10:00:00');`

    //**************************************************//
    //  CHANNEL BLOCKED CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelBlocked" VALUES ('fdpvTLhbNpjA39Pc7wwtn', 'pihayPlUh0qtDrePkJ87t');`

    //**************************************************//
    //  CHANNEL INVITED CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelInvited" VALUES ('fdpvTLhbNpjA39Pc7wwtn', 'RDaquZM1MRu7A1btyFiNb');`
  })

  afterAll(async () => {
    await cleanDataBase(prismaService)
    await prismaService.$disconnect()
  })

  it('channelMemberService should be defined', () => {
    expect(channelMemberService).toBeDefined()
  })

  it('channelBlockedService should be defined', () => {
    expect(channelBlockedService).toBeDefined()
  })

  it('channelInvitedService should be defined', () => {
    expect(channelInvitedService).toBeDefined()
  })

  it('channelService should be defined', () => {
    expect(channelService).toBeDefined()
  })

  it('prismaService should be defined', () => {
    expect(prismaService).toBeDefined()
  })

  describe('Test Mutation', () => {
    it('should create ChannelMember', async () => {
      const channelMemberData = {
        avatarUrl: 'Nice_AVATAAAAR',
        nickname: 'Nick_la_vie',
        userId: '567ayPlUh0qtDrePkJ87t',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }
      const newChannelMember = await channelMemberService.create(
        channelMemberData
      )
      expect(newChannelMember).toBeDefined()
    })

    it('should create ChannelMember in protected channel', async () => {
      const channelMemberData = {
        avatarUrl: 'Nice_AVATAAAAR',
        nickname: 'Nick_la_vie',
        userId: 'fdpvTLhbNpjA39Pc7wwtn',
        channelId: 'RDaquZM1MRu7A1btyFiNb'
      }
      const newChannelMember = await channelMemberService.create(
        channelMemberData
      )
      expect(newChannelMember).toBeDefined()
    })

    it('should update ChannelMember', async () => {
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

    it('should upgrade ChannelMember to Admin', async () => {
      const updatedChannelMember = await channelMemberService.makeAdmin(
        '765ayPlUh0qtDrePkJ87t',
        'pihayPlUh0qtDrePkJ87t'
      )
      expect(updatedChannelMember.type).toStrictEqual(EMemberType.Admin)
    })

    it('should mute an ChannelMember', async () => {
      const updatedChannelMember = await channelMemberService.mute(
        '765ayPlUh0qtDrePkJ87t',
        'pihayPlUh0qtDrePkJ87t'
      )
      expect(updatedChannelMember.muted).toStrictEqual(true)
    })
    it('should unmute an muted ChannelMember', async () => {
      const updatedChannelMember = await channelMemberService.unmute(
        'ftrX94_NVjmzVm9QL3k4r',
        'dxb50bMlJwngXPUyc6yNX'
      )
      expect(updatedChannelMember.muted).toStrictEqual(false)
    })

    it('should delete a ChannelMember', async () => {
      const deleteChannelMember = await channelMemberService.delete(
        '765ayPlUh0qtDrePkJ87t',
        'pihayPlUh0qtDrePkJ87t'
      )
      expect(deleteChannelMember).toBeDefined()
    })
  })
  describe('Test query', () => {
    it('should find a ChannelMember', async () => {
      const foundChannelMember = await channelMemberService.findOne(
        '765ayPlUh0qtDrePkJ87t',
        'pihayPlUh0qtDrePkJ87t'
      )
      expect(foundChannelMember).toBeDefined()
    })

    it('should find all Channel', async () => {
      const channelUsers = await channelMemberService.findAllInChannel(
        'pihayPlUh0qtDrePkJ87t'
      )
      expect(channelUsers).toBeDefined()
      expect(channelUsers.length).toBeGreaterThanOrEqual(1)
    })
  })
  describe('Test Error', () => {
    it('trying to make an admin on an Admin', async () => {
      await expect(
        channelMemberService.makeAdmin(
          'fdpvTLhbNpjA39Pc7wwtn',
          'dxb50bMlJwngXPUyc6yNX'
        )
      ).rejects.toThrow(ExceptionTryingToMakeAdminAnAdmin)
    })

    it('trying to mute an already muted user', async () => {
      await expect(
        channelMemberService.mute(
          'ftrX94_NVjmzVm9QL3k4r',
          'dxb50bMlJwngXPUyc6yNX'
        )
      ).rejects.toThrow(ExceptionTryingToMuteAMuted)
    })

    it('trying to mute an already muted user', async () => {
      await expect(
        channelMemberService.unmute(
          'fdpvTLhbNpjA39Pc7wwtn',
          'dxb50bMlJwngXPUyc6yNX'
        )
      ).rejects.toThrow(ExceptionTryingToUnmuteAnUnmuted)
    })

    it('create with invalid channel data', async () => {
      const invalidData = {
        avatarUrl: 'Nice_AVATAAAAR',
        nickname: 'Nick_la_vie',
        userId: '567ayPlUh0qtDrePkJ87t',
        channelId: '666'
      }
      await expect(channelMemberService.create(invalidData)).rejects.toThrow(
        PrismaClientKnownRequestError
      )
    })

    it('create with invalid user data', async () => {
      const invalidData = {
        avatarUrl: 'Nice_AVATAAAAR',
        nickname: 'Nick_la_vie',
        userId: '666',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }
      await expect(channelMemberService.create(invalidData)).rejects.toThrow(
        PrismaClientKnownRequestError
      )
    })

    it('trying to add a blocked member', async () => {
      const invalidData = {
        avatarUrl: 'Nice_AVATAAAAR',
        nickname: 'Nick_la_vie',
        userId: 'fdpvTLhbNpjA39Pc7wwtn',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }
      await expect(channelMemberService.create(invalidData)).rejects.toThrow(
        ExceptionUserBlockedInChannel
      )
    })

    it('trying to add a non invited member', async () => {
      const invalidData = {
        avatarUrl: 'Nice_AVATAAAAR',
        nickname: 'Nick_la_vie',
        userId: 'ftrX94_NVjmzVm9QL3k4r',
        channelId: 'RDaquZM1MRu7A1btyFiNb'
      }
      await expect(channelMemberService.create(invalidData)).rejects.toThrow(
        ExceptionUserNotInvited
      )
    })

    it('trying to add a member in a channel with maxUsers reached', async () => {
      const invalidData = {
        avatarUrl: 'Nice_AVATAAAAR',
        nickname: 'Nick_la_vie',
        userId: '567ayPlUh0qtDrePkJ87t',
        channelId: 'dxb50bMlJwngXPUyc6yNX'
      }
      await expect(channelMemberService.create(invalidData)).rejects.toThrow(
        ExceptionInvalidMaxUserInChannel
      )
    })
  })
})
