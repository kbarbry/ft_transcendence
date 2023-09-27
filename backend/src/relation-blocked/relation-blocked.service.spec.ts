import { Test, TestingModule } from '@nestjs/testing'
import { UserPresenceService } from '../user-presence/user-presence.service'
import { RelationRequestsService } from '../relation-requests/relation-requests.service'
import { RelationFriendService } from '../relation-friend/relation-friend.service'
import { RelationBlockedService } from './relation-blocked.service'
import { PrismaService } from '../prisma/prisma.service'
import { cleanDataBase } from '../../test/setup-environment'
import { ExceptionRequestingYourself } from '../user/exceptions/request.exceptions'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import {
  ExceptionAlreadyBlocked,
  ExceptionBlockedYourself
} from '../user/exceptions/blocked.exceptions'

describe('UserPresenceService', () => {
  let prismaService: PrismaService
  let relationPresenceService: UserPresenceService
  let relationBlockedService: RelationBlockedService
  let relationRequestsService: RelationRequestsService
  let relationFriendService: RelationFriendService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPresenceService,
        PrismaService,
        RelationFriendService,
        RelationRequestsService,
        RelationBlockedService
      ]
    }).compile()

    prismaService = module.get<PrismaService>(PrismaService)
    relationPresenceService =
      module.get<UserPresenceService>(UserPresenceService)
    relationBlockedService = module.get<RelationBlockedService>(
      RelationBlockedService
    )
    relationRequestsService = module.get<RelationRequestsService>(
      RelationRequestsService
    )
    relationFriendService = module.get<RelationFriendService>(
      RelationFriendService
    )
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
      ('a2OayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1),
      ('baaayPlUh0qtDrePkJ87t', 'random url', 'adel@42.fr', 'Adelou', 'oui', null, null, false, 'Online', 'English', 1),
      ('j6-X94_NVjmzVm9QL3k4r', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12),
      ('bbbbyPlUh0qtDrePkJ87t', 'random url', 'mama@42.fr', 'mama', 'oui', null, null, false, 'Online', 'English', 1),
      ('ccccyPlUh0qtDrePkJ87t', 'random url', 'maurice@42.fr', 'Momo', 'oui', null, null, false, 'Online', 'English', 1),
      ('ddddyPlUh0qtDrePkJ87t', 'random url', 'suzette@42.fr', 'Suzette', 'oui', null, null, false, 'Online', 'English', 1),
      ('eeeeyPlUh0qtDrePkJ87t', 'random url', 'mauricette@42.fr', 'Momoe', 'oui', null, null, false, 'Online', 'English', 1),
      ('j9-X94_NVjmzVm9QL3k4r', 'random url', 'seveneleven@42.fr', '79', 'oui', null, null, false, 'Online', 'English', 1),
      ('drfOayPwwUh12tDrePkJ8', 'random url', 'other@42.fr', 'other', 'oui', null, null, false, 'Online', 'English', 1),
      ('qci4ayPwwUh12tDrePkJ8', 'random url', 'dad42.fr', 'dad', 'oui', null, null, false, 'Online', 'English', 1);`

    //**************************************************//
    //  RELATION BLOCKED CREATION
    //**************************************************//
    await prismaService.$executeRaw`INSERT INTO
      "public"."RelationBlocked"
      VALUES
      ('a2OayPlUh0qtDrePkJ87t', 'j6-X94_NVjmzVm9QL3k4r'),
      ('a2OayPlUh0qtDrePkJ87t', 'baaayPlUh0qtDrePkJ87t'),
      ('eeeeyPlUh0qtDrePkJ87t', 'ddddyPlUh0qtDrePkJ87t'),
      ('eeeeyPlUh0qtDrePkJ87t', 'ccccyPlUh0qtDrePkJ87t'),
      ('eeeeyPlUh0qtDrePkJ87t', 'bbbbyPlUh0qtDrePkJ87t'),
      ('drfOayPwwUh12tDrePkJ8', 'j9-X94_NVjmzVm9QL3k4r'),
      ('qci4ayPwwUh12tDrePkJ8', 'j9-X94_NVjmzVm9QL3k4r');`
  })

  afterAll(async () => {
    await cleanDataBase(prismaService)
    await prismaService.$disconnect()
  })

  it('relationFriend should be defined', () => {
    expect(relationFriendService).toBeDefined()
  })
  it('relationBlocked should be defined', () => {
    expect(relationBlockedService).toBeDefined()
  })
  it('relationRequest should be defined', () => {
    expect(relationRequestsService).toBeDefined()
  })
  it('prismaService be define', () => {
    expect(prismaService).toBeDefined()
  })

  describe('Test Mutation', () => {
    it('should return isBlocked - false - uknown userA', async () => {
      const result = await relationBlockedService.isBlocked(
        'bcdefPlUh0qtDrePkJ87t',
        'a2OayPlUh0qtDrePkJ87tt'
      )
      expect(result).toBe(false)
    })
    it('should return isBlocked - false - uknown userB', async () => {
      const result = await relationBlockedService.isBlocked(
        'ccccyPlUh0qtDrePkJ87t',
        'jeanPlUh0qtDrePkJ87tt'
      )
      expect(result).toBe(false)
    })
  })
  describe('Test Query', () => {
    it('should return isBlocked - true', async () => {
      const result = await relationBlockedService.isBlocked(
        'a2OayPlUh0qtDrePkJ87t',
        'baaayPlUh0qtDrePkJ87t'
      )
      expect(result).toBe(true)
    })
    it('should return ExceptionAlreadyBlocked', async () => {
      await expect(
        relationBlockedService.create(
          'a2OayPlUh0qtDrePkJ87t',
          'j6-X94_NVjmzVm9QL3k4r'
        )
      ).rejects.toThrow(ExceptionAlreadyBlocked)
    })
    it('findAllBlockedUser - should find one user blocked by ID', async () => {
      const findUsers = await relationBlockedService.findAllBlockedByUser(
        'a2OayPlUh0qtDrePkJ87t'
      )
      const expectedRes = ['baaayPlUh0qtDrePkJ87t']
      expect(findUsers).toStrictEqual(expectedRes)
    })
    it('findAllBlockedUser - should find users blocked by ID', async () => {
      const blockedUsers = await relationBlockedService.findAllBlockedByUser(
        'eeeeyPlUh0qtDrePkJ87t'
      )
      const expectedBlockedUsers = [
        'ddddyPlUh0qtDrePkJ87t',
        'ccccyPlUh0qtDrePkJ87t',
        'bbbbyPlUh0qtDrePkJ87t'
      ]
      expect(blockedUsers).toEqual(expectedBlockedUsers)
    })
    it('findAllBlockingUser - should find users blocking ID', async () => {
      const blockedUsers = await relationBlockedService.findAllBlockingByUser(
        'j9-X94_NVjmzVm9QL3k4r'
      )
      const expectedBlockedUsers = [
        'drfOayPwwUh12tDrePkJ8',
        'qci4ayPwwUh12tDrePkJ8'
      ]
      expect(blockedUsers).toEqual(expectedBlockedUsers)
    })
  })
  describe('Test Error', () => {
    it('should return ExceptionBlockedYourself', async () => {
      await expect(
        relationBlockedService.create(
          'aaaayPlUh0qtDrePkJ87t',
          'aaaayPlUh0qtDrePkJ87t'
        )
      ).rejects.toThrow(ExceptionBlockedYourself)
    })
    it('should return isBlocked - false - wrong order test', async () => {
      const result = await relationBlockedService.isBlocked(
        'baaayPlUh0qtDrePkJ87t',
        'a2OayPlUh0qtDrePkJ87t'
      )
      expect(result).toBe(false)
    })
  })
})
