import { Test, TestingModule } from '@nestjs/testing'
import { RelationFriendService } from './relation-friend.service'
import { PrismaService } from '../prisma/prisma.service'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

describe('RelationFriendService', () => {
  let relationFriendService: RelationFriendService
  let prismaService: PrismaService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationFriendService, PrismaService]
    }).compile()

    relationFriendService = module.get<RelationFriendService>(
      RelationFriendService
    )
    prismaService = module.get<PrismaService>(PrismaService)

    await prismaService.$executeRaw`DELETE FROM "public"."RelationFriend";`
    await prismaService.$executeRaw`DELETE FROM "public"."User";`

    await prismaService.$executeRaw`INSERT INTO 
      "public"."User" 
      VALUES 
      ('537d4ec6daffd64a2d4c-', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1),
      ('f488e59aef615c5df6df-', 'random url', 'bob.fr', 'Bobby', 'Babby', null, null, false, 'Online', 'English', 1),
      ('4376f06677b65d3168d6-', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12),
      ('df87734d323ac71c6efb-', 'random url', 'david@42.fr', 'dav', 'oui', null, null, false, 'Invisble', 'French', 12),
      ('ec178ef86d29197b6ffd-', 'random url', 'evan@42.fr', 'evee', 'oui', null, null, false, 'Idle', 'Spanish', 36),
      ('e28d4ff1f6cd647fc171-', 'random url', 'frank@42.fr', 'punisher', 'oui', null, null, false, 'DoNotDisturb', 'Spanish', 9000);`

    await prismaService.$executeRaw`INSERT INTO 
      "public"."RelationFriend" 
      VALUES 
      ('4376f06677b65d3168d6-', '537d4ec6daffd64a2d4c-'),
      ('4376f06677b65d3168d6-', 'df87734d323ac71c6efb-'),
      ('e28d4ff1f6cd647fc171-', 'ec178ef86d29197b6ffd-'),
      ('e28d4ff1f6cd647fc171-', 'f488e59aef615c5df6df-'),

      ('4376f06677b65d3168d6-', 'ec178ef86d29197b6ffd-'),
      ('537d4ec6daffd64a2d4c-', 'ec178ef86d29197b6ffd-'),

      ('df87734d323ac71c6efb-', 'e28d4ff1f6cd647fc171-');`
  })

  // Sorted Id
  // 4376f06677b65d3168d6-
  // 537d4ec6daffd64a2d4c-
  // df87734d323ac71c6efb-
  // e28d4ff1f6cd647fc171-
  // ec178ef86d29197b6ffd-
  // f488e59aef615c5df6df-

  afterAll(async () => {
    await prismaService.$executeRaw`DELETE FROM "public"."RelationFriend";`
    await prismaService.$executeRaw`DELETE FROM "public"."User";`
    await prismaService.$disconnect()
  })

  describe('Test Mutations', () => {
    it('create a new relaton in DB with id in the right order', async () => {
      const creatRet = await relationFriendService.create(
        '4376f06677b65d3168d6-',
        'f488e59aef615c5df6df-'
      )
      expect(creatRet).toStrictEqual({
        userAId: '4376f06677b65d3168d6-',
        userBId: 'f488e59aef615c5df6df-'
      })
    })

    it('create a new relaton in DB with id in the wrong order', async () => {
      const creatRet = await relationFriendService.create(
        'e28d4ff1f6cd647fc171-',
        '4376f06677b65d3168d6-'
      )
      expect(creatRet).toStrictEqual({
        userAId: '4376f06677b65d3168d6-',
        userBId: 'e28d4ff1f6cd647fc171-'
      })
    })

    it('delete a new relaton in DB with id in the right order', async () => {
      const deleteRet = await relationFriendService.delete(
        '4376f06677b65d3168d6-',
        'ec178ef86d29197b6ffd-'
      )
      expect(deleteRet).toStrictEqual({
        userAId: '4376f06677b65d3168d6-',
        userBId: 'ec178ef86d29197b6ffd-'
      })
    })

    it('delete a new relaton in DB with id in the wrong order', async () => {
      const deleteRet = await relationFriendService.delete(
        'ec178ef86d29197b6ffd-',
        '537d4ec6daffd64a2d4c-'
      )
      expect(deleteRet).toStrictEqual({
        userAId: '537d4ec6daffd64a2d4c-',
        userBId: 'ec178ef86d29197b6ffd-'
      })
    })
  })

  describe('Test Query', () => {
    it("return all friend of an existing user's id", async () => {
      const friend_list: string[] = [
        'e28d4ff1f6cd647fc171-',
        '4376f06677b65d3168d6-'
      ]
      const friends = await relationFriendService.findAll(
        'df87734d323ac71c6efb-'
      )
      expect(friends).toStrictEqual(friend_list)
    })

    it('verify if two users in WRONG order are friend', async () => {
      const isFriendRet = await relationFriendService.isFriend(
        '537d4ec6daffd64a2d4c-',
        '4376f06677b65d3168d6-'
      )
      expect(isFriendRet).toStrictEqual(true)
    })

    it('verify if two users in RIGHT order are friend', async () => {
      const isFriendRet = await relationFriendService.isFriend(
        '4376f06677b65d3168d6-',
        '537d4ec6daffd64a2d4c-'
      )
      expect(isFriendRet).toStrictEqual(true)
    })

    it('verify if two users in WRONG order are not friend', async () => {
      const isFriendRet = await relationFriendService.isFriend(
        'ec178ef86d29197b6ffd-',
        'f488e59aef615c5df6df-'
      )
      expect(isFriendRet).toStrictEqual(false)
    })

    it('verify if two users in RIGHT order are not friend', async () => {
      const isFriendRet = await relationFriendService.isFriend(
        'f488e59aef615c5df6df-',
        'ec178ef86d29197b6ffd-'
      )
      expect(isFriendRet).toStrictEqual(false)
    })
  })

  describe('Test Error', () => {
    it('throw an error after trying to create a new relaton in DB with an already existing id', async () => {
      expect(async () => {
        await relationFriendService.create(
          '4376f06677b65d3168d6-',
          '537d4ec6daffd64a2d4c-'
        )
      }).rejects.toThrow(PrismaClientKnownRequestError)
    })

    it("throw an error after trying to create a new relaton in DB with id's of non existing user", async () => {
      expect(async () => {
        await relationFriendService.create(
          'fff6f06677b65d3168d6-',
          'fffd4ec6daffd64a2d4c-'
        )
      }).rejects.toThrow(PrismaClientKnownRequestError)
    })

    it('throw an error after trying to delete non existing id', async () => {
      expect(async () => {
        await relationFriendService.delete(
          'fff6f06677b65d3168d6-',
          'fffd4ec6daffd64a2d4c-'
        )
      }).rejects.toThrow(PrismaClientKnownRequestError)
    })

    it("return all friend of a non existing user's id", async () => {
      const emptytab: string[] = []
      const friends = await relationFriendService.findAll(
        'fffd4ff1f6cd647fc171-'
      )
      expect(friends).toStrictEqual(emptytab)
    })

    it('verify if an existing user is friend with a non existing user', async () => {
      const isFriendRet = await relationFriendService.isFriend(
        'f488e59aef615c5df6df-',
        'ffff8ef86d29197b6ffd-'
      )
      expect(isFriendRet).toStrictEqual(false)
    })
  })
})
