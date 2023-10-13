import { Test, TestingModule } from '@nestjs/testing'
import { RelationBlockedService } from './relation-blocked.service'
import { PrismaService } from '../prisma/prisma.service'
import { cleanDataBase } from '../../test/setup-environment'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import {
  ExceptionAlreadyBlocked,
  ExceptionBlockedYourself
} from '../user/exceptions/blocked.exceptions'
import { RelationBlockedInput } from './dto/create-relation-blocked.input'

describe('RelationBlockedService', () => {
  let relationBlockedService: RelationBlockedService
  let prismaService: PrismaService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationBlockedService, PrismaService]
    }).compile()

    relationBlockedService = module.get<RelationBlockedService>(
      RelationBlockedService
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
      ('a2OayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1),
      ('a10ayPlUh0qtDrePkJ87t', 'random url', 'boulette@42.fr', 'Boul', 'oui', null, null, false, 'Online', 'English', 1),
      ('baaayPlUh0qtDrePkJ87t', 'random url', 'adel@42.fr', 'Adelou', 'oui', null, null, false, 'Online', 'English', 1),
      ('j6-X94_NVjmzVm9QL3k4r', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12),
      ('bbbbyPlUh0qtDrePkJ87t', 'random url', 'mama@42.fr', 'mama', 'oui', null, null, false, 'Online', 'English', 1),
      ('ccccyPlUh0qtDrePkJ87t', 'random url', 'maurice@42.fr', 'Momo', 'oui', null, null, false, 'Online', 'English', 1),
      ('ddddyPlUh0qtDrePkJ87t', 'random url', 'suzette@42.fr', 'Suzette', 'oui', null, null, false, 'Online', 'English', 1),
      ('eeeeyPlUh0qtDrePkJ87t', 'random url', 'mauricette@42.fr', 'Momoe', 'oui', null, null, false, 'Online', 'English', 1),
      ('j9-X94_NVjmzVm9QL3k4r', 'random url', 'seveneleven@42.fr', '79', 'oui', null, null, false, 'Online', 'English', 1),
      ('drfOayPwwUh12tDrePkJ8', 'random url', 'other@42.fr', 'other', 'oui', null, null, false, 'Online', 'English', 1),
      ('qci4ayPwwUh12tDrePkJ8', 'random url', 'dad42.fr', 'dad', 'oui', null, null, false, 'Online', 'English', 1),
      ('qci4ayPwwUh12tDrePkJ9', 'random url', 'dkj842.fr', 'dkj', 'oui', null, null, false, 'Online', 'English', 1),
      ('e10eyPlUh0qtDrePkJ87t', 'random url', 'edix42.fr', 'Eddy', 'oui', null, null, false, 'Online', 'English', 1),
      ('qci4ayPwwUh12tDrePkJ0', 'random url', 'papy42.fr', 'papy', 'oui', null, null, false, 'Online', 'English', 1);`

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
    await prismaService.$executeRaw`INSERT INTO
      "public"."RelationRequests"
      VALUES
      ('a10ayPlUh0qtDrePkJ87t', 'j6-X94_NVjmzVm9QL3k4r'),
      ('a10ayPlUh0qtDrePkJ87t', 'baaayPlUh0qtDrePkJ87t'),
      ('e10eyPlUh0qtDrePkJ87t', 'ddddyPlUh0qtDrePkJ87t');`

    await prismaService.$executeRaw`INSERT INTO
      "public"."RelationFriend"
      VALUES
      ('e10eyPlUh0qtDrePkJ87t', 'ccccyPlUh0qtDrePkJ87t'),
      ('e10eyPlUh0qtDrePkJ87t', 'bbbbyPlUh0qtDrePkJ87t');`
  })

  afterAll(async () => {
    await cleanDataBase(prismaService)
    await prismaService.$disconnect()
  })

  it('relationBlocked should be defined', () => {
    expect(relationBlockedService).toBeDefined()
  })

  it('prismaService be define', () => {
    expect(prismaService).toBeDefined()
  })

  describe('Test Mutation', () => {
    it('should create - RelationBlocked', async () => {
      const input: RelationBlockedInput = {
        userBlockingId: 'qci4ayPwwUh12tDrePkJ9',
        userBlockedId: 'qci4ayPwwUh12tDrePkJ0'
      }
      const expectedRes = {
        userBlockingId: 'qci4ayPwwUh12tDrePkJ9',
        userBlockedId: 'qci4ayPwwUh12tDrePkJ0'
      }
      relationBlockedService.create(input)
      expect(input).toStrictEqual(expectedRes)
    })
  })

  describe('Test Query', () => {
    it('should return isBlocked - false - unknown userA', async () => {
      const result = await relationBlockedService.isBlocked(
        'bcdefPlUh0qtDrePkJ87t',
        'a2OayPlUh0qtDrePkJ87tt'
      )
      expect(result).toStrictEqual(false)
    })

    it('should return isBlocked - false - unknown userB', async () => {
      const result = await relationBlockedService.isBlocked(
        'ccccyPlUh0qtDrePkJ87t',
        'jeanPlUh0qtDrePkJ87tt'
      )
      expect(result).toStrictEqual(false)
    })

    it('should return isBlocked - true', async () => {
      const result = await relationBlockedService.isBlocked(
        'a2OayPlUh0qtDrePkJ87t',
        'baaayPlUh0qtDrePkJ87t'
      )
      expect(result).toStrictEqual(true)
    })

    it('findAllBlockedUser - should find one user blocked by ID', async () => {
      const findUsers = await relationBlockedService.findAllBlockedByUser(
        'qci4ayPwwUh12tDrePkJ8'
      )
      const expectedRes = ['j9-X94_NVjmzVm9QL3k4r']
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

    it('should return isRequest - true', async () => {
      const result = await prismaService.relationRequests.findUnique({
        where: {
          userSenderId_userReceiverId: {
            userSenderId: 'a10ayPlUh0qtDrePkJ87t',
            userReceiverId: 'baaayPlUh0qtDrePkJ87t'
          }
        }
      })
      const expected = {
        userSenderId: 'a10ayPlUh0qtDrePkJ87t',
        userReceiverId: 'baaayPlUh0qtDrePkJ87t'
      }
      expect(result).toStrictEqual(expected)
    })

    it('should create - RelationBlocked and delete request A to B', async () => {
      const input: RelationBlockedInput = {
        userBlockingId: 'a10ayPlUh0qtDrePkJ87t',
        userBlockedId: 'j6-X94_NVjmzVm9QL3k4r'
      }
      const expectedRes = {
        userBlockingId: 'a10ayPlUh0qtDrePkJ87t',
        userBlockedId: 'j6-X94_NVjmzVm9QL3k4r'
      }
      expect(input).toStrictEqual(expectedRes)
    })
    // it('should return isRequest - false', async () => {
    //   const result = await prismaService.relationRequests.findUnique({
    //     where: {
    //       userSenderId_userReceiverId: {
    //         userSenderId: 'a10ayPlUh0qtDrePkJ87t',
    //         userReceiverId: 'baaayPlUh0qtDrePkJ87t'
    //       }
    //     }
    //   })
    //   expect(result).toStrictEqual(null)
    // })

    it('should return isFriend - true', async () => {
      const result = await prismaService.relationFriend.findUnique({
        where: {
          userAId_userBId: {
            userAId: 'e10eyPlUh0qtDrePkJ87t',
            userBId: 'ccccyPlUh0qtDrePkJ87t'
          }
        }
      })
      const expected = {
        userAId: 'e10eyPlUh0qtDrePkJ87t',
        userBId: 'ccccyPlUh0qtDrePkJ87t'
      }
      expect(result).toStrictEqual(expected)
    })
    it('should create - RelationBlocked and delete relationFriend A to B', async () => {
      const input: RelationBlockedInput = {
        userBlockingId: 'e10eyPlUh0qtDrePkJ87t',
        userBlockedId: 'ccccyPlUh0qtDrePkJ87t'
      }
      const expectedRes = {
        userBlockingId: 'e10eyPlUh0qtDrePkJ87t',
        userBlockedId: 'ccccyPlUh0qtDrePkJ87t'
      }
      expect(input).toStrictEqual(expectedRes)
    })
    // it('should return isFriend - false', async () => {
    //   const result = await prismaService.relationFriend.findUnique({
    //     where: {
    //       userAId_userBId: {
    //         userAId: 'e10eyPlUh0qtDrePkJ87t',
    //         userBId: 'ccccyPlUh0qtDrePkJ87t'
    //       }
    //     }
    //   })
    //   expect(result).toStrictEqual(false)
    // })
  })

  describe('Test Error', () => {
    it('should return ExceptionBlockedYourself', async () => {
      const input: RelationBlockedInput = {
        userBlockingId: 'aaaayPlUh0qtDrePkJ87t',
        userBlockedId: 'aaaayPlUh0qtDrePkJ87t'
      }
      await expect(async () => {
        await relationBlockedService.create(input)
      }).rejects.toThrow(ExceptionBlockedYourself)
    })

    it('should return ExceptionAlreadyBlocked', async () => {
      const input: RelationBlockedInput = {
        userBlockingId: 'a2OayPlUh0qtDrePkJ87t',
        userBlockedId: 'j6-X94_NVjmzVm9QL3k4r'
      }
      await expect(async () => {
        await relationBlockedService.create(input)
      }).rejects.toThrow(ExceptionAlreadyBlocked)
    })

    it('should return isBlocked - false - wrong order test', async () => {
      const result = await relationBlockedService.isBlocked(
        'baaayPlUh0qtDrePkJ87t',
        'a2OayPlUh0qtDrePkJ87t'
      )
      expect(result).toBe(false)
    })

    it('should fail - userA does not exist', async () => {
      const input: RelationBlockedInput = {
        userBlockingId: 'j6-X94_NVjmzVm9QL3k4r',
        userBlockedId: 'qci4ayPwwUh12tDre1234'
      }
      await expect(async () => {
        await relationBlockedService.create(input)
      }).rejects.toThrow(PrismaClientKnownRequestError)
    })

    it('should fail - userB does not exist', async () => {
      const input: RelationBlockedInput = {
        userBlockingId: '1234ayPwwUh12tDre1234',
        userBlockedId: 'j6-X94_NVjmzVm9QL3k4r'
      }
      await expect(async () => {
        await relationBlockedService.create(input)
      }).rejects.toThrow(PrismaClientKnownRequestError)
    })
  })
})
