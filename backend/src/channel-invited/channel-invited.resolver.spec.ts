import { Test, TestingModule } from '@nestjs/testing'
import { ChannelInvitedResolver } from './channel-invited.resolver'
import { PrismaService } from '../prisma/prisma.service'
import { cleanDataBase } from '../../test/setup-environment'
import { ChannelInvitedService } from './channel-invited.service'

describe('ChannelInvitedResolver', () => {
  let resolver: ChannelInvitedResolver
  let prismaService: PrismaService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelInvitedResolver, ChannelInvitedService, PrismaService]
    }).compile()

    resolver = module.get<ChannelInvitedResolver>(ChannelInvitedResolver)
    prismaService = module.get<PrismaService>(PrismaService)

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
      ('567ayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Awdy', 'oui', null, null, false, 'Online', 'English', 1),
      ('ec178ef86d29197b6ffd-', 'random url', 'evan@42.fr', 'evee', 'oui', null, null, false, 'Idle', 'Spanish', 36),
      ('e28d4ff1f6cd647fc171-', 'random url', 'frank@42.fr', 'punisher', 'oui', null, null, false, 'DoNotDisturb', 'Spanish', 9000);`
    //**************************************************//
    //  CHANNEL CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO "public"."Channel" VALUES ('pihayPlUh0qtDrePkJ87t', 'random name', 'randomURL', 'TopicName', 'Password123', '567ayPlUh0qtDrePkJ87t', 50, 'Protected', '2023-09-13 10:00:00');`
    await prismaService.$executeRaw`INSERT INTO "public"."Channel" VALUES ('RDaquZM1MRu7A1btyFiNb', 'random name2', 'randomURL', 'TopicName', 'Password123', '567ayPlUh0qtDrePkJ87t', 50, 'Public', '2023-09-13 10:00:00');`

    //**************************************************//
    //  CHANNEL INVITED CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelInvited" VALUES ('765ayPlUh0qtDrePkJ87t', 'pihayPlUh0qtDrePkJ87t');`
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelInvited" VALUES ('ftrX94_NVjmzVm9QL3k4r', 'pihayPlUh0qtDrePkJ87t');`

    //**************************************************//
    //  CHANNEL BLOCKED CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelBlocked" VALUES ('ec178ef86d29197b6ffd-', 'pihayPlUh0qtDrePkJ87t');`

    //**************************************************//
    //  CHANNEL MEMBER CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO "public"."ChannelMember" VALUES ('NewAvatarURL', 'WonderfullNickname', 'e28d4ff1f6cd647fc171-', 'pihayPlUh0qtDrePkJ87t', 'Member', 'true', '2023-09-13 10:00:00');`
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  //Create with wrong user id
  //Create with wrong channel id

  //Delete with wrong user id
  //Delete with wrong channel id

  //same test for find one and find all
})
