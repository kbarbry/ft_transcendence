import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { GameStatService } from './game-stat.service'
import { EGameType, Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ExceptionSamePlayerInGame } from '../user/exceptions/game-stat.exception'
import { cleanDataBase } from '../../test/setup-environment'

describe('GameStatService', () => {
  let gameStatService: GameStatService
  let prismaService: PrismaService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameStatService, PrismaService]
    }).compile()

    gameStatService = module.get<GameStatService>(GameStatService)
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
      ('d2OayPlUh0qtDrePkJ87t', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1),
      ('j6-X94_NVjmzVm9QL3k4r', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12),
      ('_U0vTLhbNpjA39Pc7wwtn', 'random url', 'bob@42.fr', 'Bobby', 'Babby', null, null, false, 'Online', 'English', 1),
      ('c-vzGU-8QlEvmHk8rjNRI', 'random url', 'david@42.fr', 'dav', 'oui', null, null, false, 'Invisble', 'French', 12);`

    //**************************************************//
    //  GAME STAT CREATION
    //**************************************************//
    await prismaService.$executeRaw`
      INSERT INTO
      "public"."GameStat"
      VALUES
      ('drfOayPc2Uh12tDrePkJ8', 'j6-X94_NVjmzVm9QL3k4r','d2OayPlUh0qtDrePkJ87t', 'Classic', 12, 15, 2, '2023-09-13 10:00:00'),
      ('uywayPlUh0qtDrePkJ87t', 'j6-X94_NVjmzVm9QL3k4r','d2OayPlUh0qtDrePkJ87t', 'Classic', 12, 15, 2, '2023-09-13 10:00:00'),
      ('cftOayPc2Uh12tDrePkJ8', 'd2OayPlUh0qtDrePkJ87t','j6-X94_NVjmzVm9QL3k4r', 'Classic', 12, 15, 2, '2023-09-13 10:00:00'),
      ('oiuOayPc2Uh12tDrePkJ8', 'd2OayPlUh0qtDrePkJ87t','j6-X94_NVjmzVm9QL3k4r', 'Special', 12, 15, 2, '2023-09-13 10:00:00');`
  })

  afterAll(async () => {
    await cleanDataBase(prismaService)
    await prismaService.$disconnect()
  })

  it('gamestatService should be defined', () => {
    expect(gameStatService).toBeDefined()
  })

  it('PrismaSerice should be defined', () => {
    expect(prismaService).toBeDefined()
  })

  describe('Test Mutation', () => {
    it('should create a GameStat', () => {
      const gameStatData = {
        timePlayed: 12,
        scoreWinner: 15,
        scoreLoser: 3,
        createdAt: new Date(),
        type: EGameType.Classic,
        winner: { connect: { id: 'd2OayPlUh0qtDrePkJ87t' } },
        looser: { connect: { id: 'j6-X94_NVjmzVm9QL3k4r' } }
      }
      const createdGameStat = gameStatService.create(gameStatData)
      expect(createdGameStat).toBeDefined()
    })
  })

  describe('Test Query', () => {
    it('should fin the GameStats', async () => {
      const foundGameStat = await gameStatService.findOne(
        'drfOayPc2Uh12tDrePkJ8'
      )
      expect(foundGameStat).toBeDefined()
    })

    it('should find all game on an User', async () => {
      const foundAllGameStat = await gameStatService.findAll(
        'd2OayPlUh0qtDrePkJ87t'
      )
      expect(foundAllGameStat).toBeDefined()
      expect(foundAllGameStat.length).toBeGreaterThan(2)
    })

    it('should find all the wingame of an user', async () => {
      const foundAllWinGameStat = await gameStatService.findWin(
        'd2OayPlUh0qtDrePkJ87t'
      )
      expect(foundAllWinGameStat).toBeDefined()
      expect(foundAllWinGameStat.length).toBeGreaterThan(1)
    })

    it('should find all the losegame of an user', async () => {
      const foundAllLoseGameStat = await gameStatService.findLose(
        'd2OayPlUh0qtDrePkJ87t'
      )
      expect(foundAllLoseGameStat).toBeDefined()
      expect(foundAllLoseGameStat.length).toBeGreaterThan(1)
    })

    it('should find all classic game of an user', async () => {
      const foundAllClassicGameStat = await gameStatService.findClassic(
        'd2OayPlUh0qtDrePkJ87t'
      )
      expect(foundAllClassicGameStat).toBeDefined()
    })

    it('should find all special game of an user', async () => {
      const foundAllSpecialGameStat = await gameStatService.findClassic(
        'd2OayPlUh0qtDrePkJ87t'
      )
      expect(foundAllSpecialGameStat).toBeDefined()
    })
  })

  describe('Test Error', () => {
    it('Gamestat created with already taken ID', async () => {
      const createInput: Prisma.GameStatCreateInput = {
        id: 'drfOayPc2Uh12tDrePkJ8',
        type: 'Classic',
        timePlayed: 12,
        scoreWinner: 15,
        scoreLoser: 2,
        createdAt: undefined,
        winner: { connect: { id: 'd2OayPlUh0qtDrePkJ87t' } },
        looser: { connect: { id: 'j6-X94_NVjmzVm9QL3k4r' } }
      }
      await expect(gameStatService.create(createInput)).rejects.toThrow(
        PrismaClientKnownRequestError
      )
    })

    it('Cannot make a game with the same player', async () => {
      const invalidplayersdata = {
        timePlayed: 12,
        scoreWinner: 15,
        scoreLoser: 3,
        createdAt: new Date(),
        type: EGameType.Classic,
        winner: { connect: { id: 'd2OayPlUh0qtDrePkJ87t' } },
        looser: { connect: { id: 'd2OayPlUh0qtDrePkJ87t' } }
      }
      await expect(gameStatService.create(invalidplayersdata)).rejects.toThrow(
        ExceptionSamePlayerInGame
      )
    })
  })
})
