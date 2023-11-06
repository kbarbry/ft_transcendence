import { Test, TestingModule } from '@nestjs/testing'
import { RelationRequestsService } from './relation-requests.service'
import { PrismaService } from '../prisma/prisma.service'
import { cleanDataBase } from '../../test/setup-environment'
import { RelationBlockedService } from '../relation-blocked/relation-blocked.service'
import { RelationFriendService } from '../relation-friend/relation-friend.service'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ExceptionRequestingYourself } from '../user/exceptions/request.exceptions'
import {
  ExceptionUserBlocked,
  ExceptionUserBlockedYou
} from '../user/exceptions/blocked.exceptions'
import { ExceptionUsersAlreadyFriend } from '../user/exceptions/friend.exceptions'
import { RelationRequestsInput } from './dto/create-relation-requests.input'

describe('RelationRequestsService', () => {
  let relationRequestsService: RelationRequestsService
  let relationBlockedService: RelationBlockedService
  let relationFriendService: RelationFriendService
  let prismaService: PrismaService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelationRequestsService,
        PrismaService,
        RelationBlockedService,
        RelationFriendService
      ]
    }).compile()

    relationRequestsService = module.get<RelationRequestsService>(
      RelationRequestsService
    )
    relationBlockedService = module.get<RelationBlockedService>(
      RelationBlockedService
    )
    relationFriendService = module.get<RelationFriendService>(
      RelationFriendService
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
    await prismaService.$executeRaw`INSERT INTO 
      "public"."User" 
      VALUES 
      ('537d4ec6daffd64a2d4c-', 'random url', 'alfred@42.fr', 'Ally', 'oui', false, false, false, false, 'Online', 'English', 1),
      ('f488e59aef615c5df6df-', 'random url', 'bob.fr', 'Bobby', 'Babby', false, false, false, false, 'Online', 'English', 1),
      ('4376f06677b65d3168d6-', 'random url', 'charlie@42.fr', 'Chacha', 'oui', false, false, false, false, 'Invisble', 'French', 12),
      ('df87734d323ac71c6efb-', 'random url', 'david@42.fr', 'dav', 'oui', false, false, false, false, 'Invisble', 'French', 12),
      ('ec178ef86d29197b6ffd-', 'random url', 'evan@42.fr', 'evee', 'oui', false, false, false, false, 'Idle', 'Spanish', 36),
      ('e28d4ff1f6cd647fc171-', 'random url', 'frank@42.fr', 'punisher', 'oui', false, false, false, false, 'DoNotDisturb', 'Spanish', 9000),
      ('ohohoff1f6cd647fc171-', 'random url', 'billy@42.fr', 'wallE', 'oui', false, false, false, false, 'Idle', 'English', 42),
      ('bababff1f6cd647fc171-', 'random url', 'castex@42.fr', 'XxCovidxX', 'oui', false, false, false, false, 'Online', 'French', 666);`

    //**************************************************//
    //  RELATION REQUESTS CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO 
      "public"."RelationRequests" 
      VALUES 
      ('537d4ec6daffd64a2d4c-', '4376f06677b65d3168d6-'),
      ('4376f06677b65d3168d6-', 'f488e59aef615c5df6df-'),
      ('4376f06677b65d3168d6-', 'df87734d323ac71c6efb-'),
      ('e28d4ff1f6cd647fc171-', 'f488e59aef615c5df6df-'),
      ('bababff1f6cd647fc171-', 'ohohoff1f6cd647fc171-'),
      ('e28d4ff1f6cd647fc171-', 'df87734d323ac71c6efb-');`

    await prismaService.$executeRaw`INSERT INTO
      "public"."RelationBlocked"
      VALUES
      ('537d4ec6daffd64a2d4c-', 'df87734d323ac71c6efb-'),
      ('4376f06677b65d3168d6-', 'f488e59aef615c5df6df-'),
      ('4376f06677b65d3168d6-', 'e28d4ff1f6cd647fc171-');`

    await prismaService.$executeRaw`INSERT INTO
      "public"."RelationFriend"
      VALUES
      ('4376f06677b65d3168d6-', 'ec178ef86d29197b6ffd-'),
      ('ec178ef86d29197b6ffd-', 'e28d4ff1f6cd647fc171-');`
  })

  afterAll(async () => {
    cleanDataBase(prismaService)
    await prismaService.$disconnect()
  })

  it('relationRequest should be defined', () => {
    expect(relationRequestsService).toBeDefined()
  })
  it('relationFriend should be defined', () => {
    expect(relationFriendService).toBeDefined()
  })
  it('relationBlocked should be defined', () => {
    expect(relationBlockedService).toBeDefined()
  })
  it('prismaService should be defined', () => {
    expect(prismaService).toBeDefined()
  })

  describe('Test Mutation', () => {
    it('should create a new user', async () => {
      const input: RelationRequestsInput = {
        userSenderId: '537d4ec6daffd64a2d4c-',
        userReceiverId: 'f488e59aef615c5df6df-'
      }
      const expectedRes = {
        userSenderId: '537d4ec6daffd64a2d4c-',
        userReceiverId: 'f488e59aef615c5df6df-'
      }

      const result = await relationRequestsService.create(input)
      expect(result).toEqual(expectedRes)
    })
  })

  it('should delete an user', async () => {
    const resRequest = await relationRequestsService.delete(
      '537d4ec6daffd64a2d4c-',
      '4376f06677b65d3168d6-'
    )
    const expectedRes = {
      userSenderId: '537d4ec6daffd64a2d4c-',
      userReceiverId: '4376f06677b65d3168d6-'
    }
    expect(resRequest).toStrictEqual(expectedRes)
  })

  it('should add userB as friend (alreadyRequested B->A)', async () => {
    const input: RelationRequestsInput = {
      userSenderId: 'ohohoff1f6cd647fc171-',
      userReceiverId: 'bababff1f6cd647fc171-'
    }
    const expectedRes = {
      userAId: 'bababff1f6cd647fc171-',
      userBId: 'ohohoff1f6cd647fc171-'
    }
    const result = await relationRequestsService.create(input)
    expect(result).toEqual(expectedRes)
  })

  describe('Test Query', () => {
    it('should find user by id', async () => {
      const findUser = await relationRequestsService.findOne(
        '537d4ec6daffd64a2d4c-',
        '4376f06677b65d3168d6-'
      )
      const expectedRes = {
        userSenderId: '537d4ec6daffd64a2d4c-',
        userReceiverId: '4376f06677b65d3168d6-'
      }
      expect(findUser).toStrictEqual(expectedRes)
    })

    it('should exist', async () => {
      const findUser = await relationRequestsService.isRequested(
        'e28d4ff1f6cd647fc171-',
        'f488e59aef615c5df6df-'
      )
      expect(findUser).toStrictEqual(true)
    })

    it('findAllRequestReceived - should find one request received', async () => {
      const findUsers = await relationRequestsService.findAllRequestReceived(
        '4376f06677b65d3168d6-'
      )
      const expectedRes = ['537d4ec6daffd64a2d4c-']
      expect(findUsers).toStrictEqual(expectedRes)
    })

    it('findAllRequestReceived - should find multiple requests', async () => {
      const findUsers = await relationRequestsService.findAllRequestReceived(
        'f488e59aef615c5df6df-'
      )
      const expectedRes = ['4376f06677b65d3168d6-', 'e28d4ff1f6cd647fc171-']
      expect(findUsers).toStrictEqual(expectedRes)
    })

    it('findAllRequestReceived - should find no requests received', async () => {
      const findUsers = await relationRequestsService.findAllRequestReceived(
        'e28d4ff1f6cd647fc171-'
      )
      const expectedRes: string[] = []
      expect(findUsers).toStrictEqual(expectedRes)
    })

    it('findAllRequestSent - should find one request', async () => {
      const findUsers = await relationRequestsService.findAllRequestSent(
        '537d4ec6daffd64a2d4c-'
      )
      const expectedRes = ['4376f06677b65d3168d6-']
      expect(findUsers).toStrictEqual(expectedRes)
    })

    it('findAllRequestSent - should find multiple requests', async () => {
      const findUsers = await relationRequestsService.findAllRequestSent(
        'e28d4ff1f6cd647fc171-'
      )
      const expectedRes = ['df87734d323ac71c6efb-', 'f488e59aef615c5df6df-']
      expect(findUsers).toStrictEqual(expectedRes)
    })

    it('findAllRequestSent - should find no requests', async () => {
      const findUsers = await relationRequestsService.findAllRequestSent(
        'df87734d323ac71c6efb-'
      )
      const expectedRes: string[] = []
      expect(findUsers).toStrictEqual(expectedRes)
    })
  })
  describe('Test Error', () => {
    it('id already created', async () => {
      const input: RelationRequestsInput = {
        userSenderId: '537d4ec6daffd64a2d4c-',
        userReceiverId: '4376f06677b65d3168d6-'
      }
      await expect(async () => {
        await relationRequestsService.create(input)
      }).rejects.toThrow(PrismaClientKnownRequestError)
    })

    it('trying to request yourself (miskina)', async () => {
      const input: RelationRequestsInput = {
        userSenderId: '537d4ec6daffd64a2d4c-',
        userReceiverId: '537d4ec6daffd64a2d4c-'
      }
      await expect(async () => {
        await relationRequestsService.create(input)
      }).rejects.toThrow(ExceptionRequestingYourself)
    })

    it('trying to request someone blocked', async () => {
      const input: RelationRequestsInput = {
        userSenderId: '537d4ec6daffd64a2d4c-',
        userReceiverId: 'df87734d323ac71c6efb-'
      }
      await expect(async () => {
        await relationRequestsService.create(input)
      }).rejects.toThrow(ExceptionUserBlocked)
    })

    it('trying to request someone who blocked you', async () => {
      const input: RelationRequestsInput = {
        userSenderId: 'f488e59aef615c5df6df-',
        userReceiverId: '4376f06677b65d3168d6-'
      }
      await expect(async () => {
        await relationRequestsService.create(input)
      }).rejects.toThrow(ExceptionUserBlockedYou)
    })

    it('trying to request someone you are already friend with A->B', async () => {
      const input: RelationRequestsInput = {
        userSenderId: 'ec178ef86d29197b6ffd-',
        userReceiverId: '4376f06677b65d3168d6-'
      }
      await expect(async () => {
        await relationRequestsService.create(input)
      }).rejects.toThrow(ExceptionUsersAlreadyFriend)
    })

    it('trying to request someone you are already friend with B->A', async () => {
      const input: RelationRequestsInput = {
        userSenderId: '4376f06677b65d3168d6-',
        userReceiverId: 'ec178ef86d29197b6ffd-'
      }
      await expect(async () => {
        await relationRequestsService.create(input)
      }).rejects.toThrow(ExceptionUsersAlreadyFriend)
    })
  })
})
