import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from '../user/user.service'
import { GameStatService } from './game-stat.service'
import { EGameType, GameStat, User, Prisma } from '@prisma/client'

describe('GameStatService', () => {
  let gameStatService: GameStatService
  let prismaService: PrismaService
  let userService: UserService
  let userLooser: User
  let userWinner: User
  let createdGameStat: GameStat
  let gameStatData: Prisma.GameStatCreateInput
  let gameStatData2: Prisma.GameStatCreateInput
  let gameStatSpecialData: Prisma.GameStatCreateInput

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameStatService, PrismaService, UserService]
    }).compile()

    gameStatService = module.get<GameStatService>(GameStatService)
    userService = module.get<UserService>(UserService)
    prismaService = module.get<PrismaService>(PrismaService)

    //**************************************************//
    //  USER CREATION
    //**************************************************//

    const userDataLooser = {
      mail: 'L2132131@example.com',
      username: 'Loo231123ser1User',
      password: 'password123',
      level: 0,
      avatarUrl: 'url_de_l_avatar_par_defaut1'
    }
    userLooser = await userService.create(userDataLooser)

    const userDataWinner = {
      mail: 'W213213r1@example.com',
      username: 'Win12312ner1User',
      password: 'password123',
      level: 0,
      avatarUrl: 'url_de_l_avatar_par_defaut2'
    }
    userWinner = await userService.create(userDataWinner)

    //**************************************************//
    //  GAME STAT CREATION
    //**************************************************//

    gameStatData = {
      timePlayed: 10,
      scoreWinner: 15,
      scoreLoser: 8,
      createdAt: new Date(),
      type: EGameType.Classic,
      winner: { connect: { id: userWinner.id } },
      looser: { connect: { id: userLooser.id } }
    }

    createdGameStat = await gameStatService.create(gameStatData)

    gameStatData2 = {
      timePlayed: 12,
      scoreWinner: 15,
      scoreLoser: 3,
      createdAt: new Date(),
      type: EGameType.Classic,
      winner: { connect: { id: userLooser.id } },
      looser: { connect: { id: userWinner.id } }
    }

    gameStatSpecialData = {
      timePlayed: 120,
      scoreWinner: 15,
      scoreLoser: 3,
      createdAt: new Date(),
      type: EGameType.Special,
      winner: { connect: { id: userWinner.id } },
      looser: { connect: { id: userLooser.id } }
    }
  })

  afterAll(async () => {
    await prismaService.gameStat.deleteMany({})
    await prismaService.user.deleteMany({})
    await prismaService.$disconnect()
  })

  describe('Test GameStat Mutation', () => {
    it('should be defined', () => {
      expect(GameStatService).toBeDefined()
    })
    it('should create a GaneStat', () => {
      expect(createdGameStat).toBeDefined
      expect(createdGameStat.timePlayed).toEqual(gameStatData.timePlayed)
    })
  })
  describe('test Gamestat Query', () => {
    it('Should find GameStat array', async () => {
      const looserWinnerInversion = await gameStatService.create(gameStatData2)
      const specialGame = await gameStatService.create(gameStatSpecialData)
      const ValidGameStat = await gameStatService.findAll(userWinner.id)
      expect(ValidGameStat).toBeDefined
      expect(Array.isArray(ValidGameStat)).toBeTruthy()
      expect(ValidGameStat.length).toBeGreaterThan(1)
      console.log('All games', ValidGameStat)
    })
    it('should find win games', async () => {
      const WinGameStat = await gameStatService.findWin(userWinner.id)
      expect(WinGameStat).toBeDefined
      expect(WinGameStat.length).toBeGreaterThan(0)
      console.log('WinGameStats', WinGameStat)
    })
    it('should find loose games', async () => {
      const LooseGameStat = await gameStatService.findLoose(userWinner.id)
      expect(LooseGameStat).toBeDefined
      expect(LooseGameStat.length).toBeGreaterThan(0)
      console.log('loseGameStats', LooseGameStat)
    })
    it('should find classic games', async () => {
      const ClassicGameStat = await gameStatService.findClassic(userWinner.id)
      expect(ClassicGameStat).toBeDefined
      console.log('ClassicGameStats', ClassicGameStat)
    })
    it('should find special games', async () => {
      // const tmp = await gameStatService.create(gameStatSpecialData)
      const SpecialGameStat = await gameStatService.findSpecial(userWinner.id)
      expect(SpecialGameStat).toBeDefined
      console.log('SpecialGameStats', SpecialGameStat)
    })
  })
})
