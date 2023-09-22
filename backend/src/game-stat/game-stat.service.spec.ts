import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { GameStatService } from './game-stat.service'
import { EGameType, Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import {
  ExceptionTryingToUpdateID,
  ExceptionSamePlayerInGame
} from '../user/exceptions/game-stat.exception'

describe('GameStatService', () => {
  let gameStatService: GameStatService
  let prismaService: PrismaService
  let gameStatData: Prisma.GameStatCreateInput
  let invalidplayersdata: Prisma.GameStatCreateInput

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameStatService, PrismaService]
    }).compile()

    gameStatService = module.get<GameStatService>(GameStatService)
    prismaService = module.get<PrismaService>(PrismaService)

    await prismaService.$executeRaw`DELETE FROM "public"."RelationFriend";`
    await prismaService.$executeRaw`DELETE FROM "public"."RelationBlocked";`
    await prismaService.$executeRaw`DELETE FROM "public"."RelationRequests";`
    await prismaService.$executeRaw`DELETE FROM "public"."UserPresence";`
    await prismaService.$executeRaw`DELETE FROM "public"."GameStat";`
    await prismaService.$executeRaw`DELETE FROM "public"."User";`
    await prismaService.$executeRaw`DELETE FROM "public"."Channel";`
    await prismaService.$executeRaw`DELETE FROM "public"."ChannelMember";`
    await prismaService.$executeRaw`DELETE FROM "public"."ChannelMessage";`
    await prismaService.$executeRaw`DELETE FROM "public"."PrivateMessage";`
  })

  beforeEach(async () => {
    //**************************************************//
    //  MAKE IT CLEAN
    //**************************************************//

    await prismaService.$executeRaw`DELETE FROM "public"."GameStat";`
    await prismaService.$executeRaw`DELETE FROM "public"."User";`

    //**************************************************//
    //  USER CREATION
    //**************************************************//

    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('d2OayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('j6-X94_NVjmzVm9QL3k4r', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('_U0vTLhbNpjA39Pc7wwtn', 'random url', 'bob@42.fr', 'Bobby', 'Babby', null, null, false, 'Online', 'English', 1);`
    await prismaService.$executeRaw`INSERT INTO "public"."User" VALUES ('c-vzGU-8QlEvmHk8rjNRI', 'random url', 'david@42.fr', 'dav', 'oui', null, null, false, 'Invisble', 'French', 12);`

    //**************************************************//
    //  GAME STAT CREATION
    //**************************************************//

    await prismaService.$executeRaw`INSERT INTO "public"."GameStat" VALUES ('drfOayPc2Uh12tDrePkJ8', 'j6-X94_NVjmzVm9QL3k4r','d2OayPlUh0qtDrePkJ87t', 'Classic', 12, 15, 2, '2023-09-13 10:00:00');`
    await prismaService.$executeRaw`INSERT INTO "public"."GameStat" VALUES ('uywayPlUh0qtDrePkJ87t', 'j6-X94_NVjmzVm9QL3k4r','d2OayPlUh0qtDrePkJ87t', 'Classic', 12, 15, 2, '2023-09-13 10:00:00');`
    await prismaService.$executeRaw`INSERT INTO "public"."GameStat" VALUES ('cftOayPc2Uh12tDrePkJ8', 'd2OayPlUh0qtDrePkJ87t','j6-X94_NVjmzVm9QL3k4r', 'Classic', 12, 15, 2, '2023-09-13 10:00:00');`
    await prismaService.$executeRaw`INSERT INTO "public"."GameStat" VALUES ('oiuOayPc2Uh12tDrePkJ8', 'd2OayPlUh0qtDrePkJ87t','j6-X94_NVjmzVm9QL3k4r', 'Special', 12, 15, 2, '2023-09-13 10:00:00');`

    gameStatData = {
      timePlayed: 12,
      scoreWinner: 15,
      scoreLoser: 3,
      createdAt: new Date(),
      type: EGameType.Classic,
      winner: { connect: { id: 'd2OayPlUh0qtDrePkJ87t' } },
      looser: { connect: { id: 'j6-X94_NVjmzVm9QL3k4r' } }
    }

    invalidplayersdata = {
      timePlayed: 12,
      scoreWinner: 15,
      scoreLoser: 3,
      createdAt: new Date(),
      type: EGameType.Classic,
      winner: { connect: { id: 'd2OayPlUh0qtDrePkJ87t' } },
      looser: { connect: { id: 'd2OayPlUh0qtDrePkJ87t' } }
    }
  })

  afterAll(async () => {
    await prismaService.$disconnect()
  })

  describe('Test GameStat Mutation', () => {
    it('should be defined', () => {
      expect(GameStatService).toBeDefined()
    })
    it('should create a GameStat', () => {
      const createdGameStat = gameStatService.create(gameStatData)
      expect(createdGameStat).toBeDefined
    })
    it('should update the GameStat', async () => {
      const updatedData = {
        scoreWinner: 55,
        scoreLoser: 32
      }
      const updatedGameStat = await gameStatService.update(
        'drfOayPc2Uh12tDrePkJ8',
        updatedData
      )
      expect(updatedGameStat.scoreWinner).toStrictEqual(updatedData.scoreWinner)
      expect(updatedGameStat.scoreLoser).toStrictEqual(updatedData.scoreLoser)
    })
    it('should delete the gameStats', async () => {
      const deletedUser = await gameStatService.delete('uywayPlUh0qtDrePkJ87t')
      console.log('DeletedUser =>> ', deletedUser)
      expect(deletedUser).toBeDefined
    })
  })
  describe('Test Query', () => {
    it('should fin the GameStats', async () => {
      const foundGameStat = await gameStatService.findOne(
        'drfOayPc2Uh12tDrePkJ8'
      )
      expect(foundGameStat).toBeDefined
    })
    it('should find all game on an User', async () => {
      const foundAllGameStat = await gameStatService.findAll(
        'd2OayPlUh0qtDrePkJ87t'
      )
      expect(foundAllGameStat).toBeDefined
      expect(foundAllGameStat.length).toBeGreaterThan(2)
    })
    it('should find all the wingame of an user', async () => {
      const foundAllWinGameStat = await gameStatService.findWin(
        'd2OayPlUh0qtDrePkJ87t'
      )
      expect(foundAllWinGameStat).toBeDefined
      expect(foundAllWinGameStat.length).toBeGreaterThan(1)
    })
    it('should find all the losegame of an user', async () => {
      const foundAllLoseGameStat = await gameStatService.findLoose(
        'd2OayPlUh0qtDrePkJ87t'
      )
      expect(foundAllLoseGameStat).toBeDefined
      expect(foundAllLoseGameStat.length).toBeGreaterThan(1)
    })
    it('should find all classic game of an user', async () => {
      const foundAllClassicGameStat = await gameStatService.findClassic(
        'd2OayPlUh0qtDrePkJ87t'
      )
      expect(foundAllClassicGameStat).toBeDefined
    })
    it('should find all special game of an user', async () => {
      const foundAllSpecialGameStat = await gameStatService.findClassic(
        'd2OayPlUh0qtDrePkJ87t'
      )
      expect(foundAllSpecialGameStat).toBeDefined
    })
  })
  describe('Test Error', () => {
    it('Gamestat created with already taken ID', async () => {
      expect(async () => {
        await prismaService.$executeRaw`INSERT INTO "public"."GameStat" VALUES ('drfOayPc2Uh12tDrePkJ8', 'j6-X94_NVjmzVm9QL3k4r','d2OayPlUh0qtDrePkJ87t', 'Classic', 12, 15, 2, '2023-09-13 10:00:00');`
      }).rejects.toThrow(PrismaClientKnownRequestError)
    })
    it('change id field', async () => {
      expect(async () => {
        const updatedData = { id: '5555' }
        await gameStatService.update('drfOayPc2Uh12tDrePkJ8', updatedData)
      }).rejects.toThrow(ExceptionTryingToUpdateID)
    })
    it('Game stat already deleted', async () => {
      expect(async () => {
        await gameStatService.delete('drfOayPc2Uh12tDrePkJ8')
        await gameStatService.delete('drfOayPc2Uh12tDrePkJ8')
      }).rejects.toThrow(PrismaClientKnownRequestError)
    })
    it('Cannot make a game with the same player', async () => {
      expect(async () => {
        await gameStatService.create(invalidplayersdata)
      }).rejects.toThrow(ExceptionSamePlayerInGame)
    })
    it('Gamestat created with already taken ID', async () => {
      expect(async () => {
        await prismaService.$executeRaw`INSERT INTO "public"."GameStat" VALUES ('drfOayPc2Uh12tDrePkJ8', 'j6-X94_NVjmzVm9QL3k4r','d2OayPlUh0qtDrePkJ87t', 'Classic', 12, 15, 2, '2023-09-13 10:00:00');`
      }).rejects.toThrow(PrismaClientKnownRequestError)
    })
    it('Gamestat created with already taken ID', async () => {
      expect(async () => {
        await prismaService.$executeRaw`INSERT INTO "public"."GameStat" VALUES ('drfOayPc2Uh12tDrePkJ8', 'j6-X94_NVjmzVm9QL3k4r','d2OayPlUh0qtDrePkJ87t', 'Classic', 12, 15, 2, '2023-09-13 10:00:00');`
      }).rejects.toThrow(PrismaClientKnownRequestError)
    })
    it('Gamestat created with already taken ID', async () => {
      expect(async () => {
        await prismaService.$executeRaw`INSERT INTO "public"."GameStat" VALUES ('drfOayPc2Uh12tDrePkJ8', 'j6-X94_NVjmzVm9QL3k4r','d2OayPlUh0qtDrePkJ87t', 'Classic', 12, 15, 2, '2023-09-13 10:00:00');`
      }).rejects.toThrow(PrismaClientKnownRequestError)
    })
    it('Gamestat created with already taken ID', async () => {
      expect(async () => {
        await prismaService.$executeRaw`INSERT INTO "public"."GameStat" VALUES ('drfOayPc2Uh12tDrePkJ8', 'j6-X94_NVjmzVm9QL3k4r','d2OayPlUh0qtDrePkJ87t', 'Classic', 12, 15, 2, '2023-09-13 10:00:00');`
      }).rejects.toThrow(PrismaClientKnownRequestError)
    })
  })
})
