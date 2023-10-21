import { Test, TestingModule } from '@nestjs/testing'
import { GameStatService } from './game-stat.service'
import { GameStatResolver } from './game-stat.resolver'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'
import { CreateGameStatInput } from './dto/create-game-stat.input'
import { EGameType } from '@prisma/client'

describe('UserResolver', () => {
  let gameStatResolver: GameStatResolver
  let validationPipe = new ValidationPipe()

  const gameStatService = {
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    findWin: jest.fn(),
    findLose: jest.fn(),
    findUsersByUserIds: jest.fn(),
    findClassic: jest.fn(),
    findSpecial: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameStatResolver,
        { provide: GameStatService, useValue: gameStatService }
      ]
    }).compile()

    gameStatResolver = module.get<GameStatResolver>(GameStatResolver)
  })

  beforeEach(() => {
    validationPipe = new ValidationPipe()
    jest.clearAllMocks()
    gameStatService.create.mockReset()
  })

  it('gameStatResolver should be defined', () => {
    expect(gameStatResolver).toBeDefined()
  })

  describe('Test Mutation', () => {
    it('createGameStat', async () => {
      const data: CreateGameStatInput = {
        type: EGameType.Classic,
        timePlayed: 1,
        scoreWinner: 12,
        scoreLoser: 10,
        loserId: '1',
        winnerId: '2'
      }
      const resExpected = { id: '1', ...data }
      gameStatService.create.mockReturnValue(resExpected)

      const result = await gameStatResolver.createGameStat(data)

      expect(result).toStrictEqual(resExpected)
    })
  })
  describe('Test Query', () => {
    it('findOneGameStat', async () => {
      const resExpected = {
        loserId: '1',
        winnerId: '2',
        content: 'this is a message1'
      }
      gameStatService.findOne.mockReturnValue(resExpected)
      const result = await gameStatResolver.findOneGameStat('1')

      expect(result).toStrictEqual(resExpected)
      expect(gameStatService.findOne).toHaveBeenCalledWith('1')
    })
    it('findAllGameStat', async () => {
      const resExpected = {
        loserId: '1'
      }
      gameStatService.findAll.mockReturnValue(resExpected)

      const result = await gameStatResolver.findAllGameStat('1')

      expect(result).toStrictEqual(resExpected)
      expect(gameStatService.findAll).toHaveBeenCalledWith('1')
    })
    it('findGameStatWin', async () => {
      const resExpected = {
        loserId: '1',
        winnerId: '2',
        content: 'this is a message'
      }

      gameStatService.findWin.mockReturnValue(resExpected)

      const result = await gameStatResolver.findGameStatWin('1')

      expect(result).toStrictEqual(resExpected)
      expect(gameStatService.findWin).toHaveBeenCalledWith('1')
    })
    it('findGameStatLose', async () => {
      const resExpected = {
        loserId: '1',
        winnerId: '2',
        content: 'this is a message'
      }

      gameStatService.findLose.mockReturnValue(resExpected)

      const result = await gameStatResolver.findGameStatLose('1')

      expect(result).toStrictEqual(resExpected)
      expect(gameStatService.findLose).toHaveBeenCalledWith('1')
    })
    it('findGameStatClassic', async () => {
      const resExpected = {
        loserId: '1',
        winnerId: '2',
        content: 'this is a message'
      }

      gameStatService.findClassic.mockReturnValue(resExpected)

      const result = await gameStatResolver.findGameStatClassic('1')

      expect(result).toStrictEqual(resExpected)
      expect(gameStatService.findClassic).toHaveBeenCalledWith('1')
    })
    it('findGameStatSpecial', async () => {
      const resExpected = {
        loserId: '1',
        winnerId: '2',
        content: 'this is a message'
      }

      gameStatService.findSpecial.mockReturnValue(resExpected)

      const result = await gameStatResolver.findGameStatSpecial('1')

      expect(result).toStrictEqual(resExpected)
      expect(gameStatService.findSpecial).toHaveBeenCalledWith('1')
    })
  })
  describe('Test Error', () => {
    describe('loserId - nanoid tests (mandatory)', () => {
      it('invalid nanoid - empty id', async () => {
        const data = {
          winnerId: 'aaaValidIdToTestuId1a',
          type: EGameType.Classic,
          timePlayed: 1,
          scoreWinner: 12,
          scoreLoser: 10
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: [
            'loserId must be exactly 21 characters long.',
            'Invalid nanoid characters.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid nanoid - null nanoId', async () => {
        const data = {
          winnerId: 'aaaValidIdToTestuId1a',
          type: EGameType.Classic,
          timePlayed: 1,
          scoreWinner: 12,
          scoreLoser: 10,
          loserId: null
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: [
            'loserId must be exactly 21 characters long.',
            'Invalid nanoid characters.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('too short nanoid', async () => {
        const data = {
          type: EGameType.Classic,
          timePlayed: 1,
          scoreWinner: 12,
          scoreLoser: 10,
          winnerId: 'aaaValidIdToTestuId1a',
          loserId: 'drfOayPww2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: ['loserId must be exactly 21 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('too long nanoid', async () => {
        const data = {
          winnerId: 'aaaValidIdToTestuId1a',
          loserId: '2313132132131223131231231',
          type: EGameType.Classic,
          timePlayed: 1,
          scoreWinner: 12,
          scoreLoser: 10
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: ['loserId must be exactly 21 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid char in nanoid', async () => {
        const data = {
          winnerId: 'aaaValidIdToTestuId1a',
          loserId: 'aaaValidId oTestuId1a',
          type: EGameType.Classic,
          timePlayed: 1,
          scoreWinner: 12,
          scoreLoser: 10
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: ['Invalid nanoid characters.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
    })
    describe('winnerId - nanoid tests (mandatory)', () => {
      it('invalid nanoid - null nanoId', async () => {
        const data = {
          loserId: 'aaaValidIdToTestuId1a',
          type: EGameType.Classic,
          timePlayed: 1,
          scoreWinner: 12,
          scoreLoser: 10,
          winnerId: null
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: [
            'winnerId must be exactly 21 characters long.',
            'Invalid nanoid characters.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('too short nanoid', async () => {
        const data = {
          type: EGameType.Classic,
          timePlayed: 1,
          scoreWinner: 12,
          scoreLoser: 10,
          loserId: 'aaaValidIdToTestuId1a',
          winnerId: 'drfOayPww2tDrePkqqqJ'
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: ['winnerId must be exactly 21 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('too long nanoid', async () => {
        const data = {
          loserId: 'aaaValidIdToTestuId1a',
          winnerId: '2313132132131223131231231',
          type: EGameType.Classic,
          timePlayed: 1,
          scoreWinner: 12,
          scoreLoser: 10
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: ['winnerId must be exactly 21 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid char in nanoid', async () => {
        const data = {
          loserId: 'aaaValidIdToTestuId1a',
          winnerId: 'aaaValidId oTestuId1a',
          type: EGameType.Classic,
          timePlayed: 1,
          scoreWinner: 12,
          scoreLoser: 10
        }

        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: ['Invalid nanoid characters.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
    })
    describe('scoreWinner- float tests', () => {
      it('invalid number - string', async () => {
        const data = {
          loserId: 'aaaValidIdToTestuId1a',
          winnerId: 'abaValidIdToTestuId1a',
          type: EGameType.Classic,
          timePlayed: 1,
          scoreLoser: 10,
          scoreWinner: '0'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: [
            'scoreWinner must not be less than 0.',
            'scoreWinner must be a number.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid number - infinity', async () => {
        const data = {
          loserId: 'aaaValidIdToTestuId1a',
          winnerId: 'abaValidIdToTestuId1a',
          type: EGameType.Classic,
          timePlayed: 1,
          scoreLoser: 10,
          scoreWinner: Infinity
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: ['scoreWinner must be a number.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid number - Nan', async () => {
        const data = {
          loserId: 'aaaValidIdToTestuId1a',
          winnerId: 'abaValidIdToTestuId1a',
          type: EGameType.Classic,
          timePlayed: 1,
          scoreLoser: 10,
          scoreWinner: NaN
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: [
            'scoreWinner must not be less than 0.',
            'scoreWinner must be a number.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('too low number', async () => {
        const data = {
          loserId: 'aaaValidIdToTestuId1a',
          winnerId: 'abaValidIdToTestuId1a',
          type: EGameType.Classic,
          timePlayed: 1,
          scoreLoser: 10,
          scoreWinner: -1
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: ['scoreWinner must not be less than 0.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
    })
    describe('scoreLoser- float tests', () => {
      it('invalid number - string', async () => {
        const data = {
          loserId: 'aaaValidIdToTestuId1a',
          winnerId: 'abaValidIdToTestuId1a',
          type: EGameType.Classic,
          timePlayed: 1,
          scoreWinner: 10,
          scoreLoser: '0'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: [
            'scoreLoser must not be less than 0.',
            'scoreLoser must be a number.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid number - infinity', async () => {
        const data = {
          loserId: 'aaaValidIdToTestuId1a',
          winnerId: 'abaValidIdToTestuId1a',
          type: EGameType.Classic,
          timePlayed: 1,
          scoreWinner: 10,
          scoreLoser: Infinity
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: ['scoreLoser must be a number.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid number - Nan', async () => {
        const data = {
          loserId: 'aaaValidIdToTestuId1a',
          winnerId: 'abaValidIdToTestuId1a',
          type: EGameType.Classic,
          timePlayed: 1,
          scoreWinner: 10,
          scoreLoser: NaN
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: [
            'scoreLoser must not be less than 0.',
            'scoreLoser must be a number.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('too low number', async () => {
        const data = {
          loserId: 'aaaValidIdToTestuId1a',
          winnerId: 'abaValidIdToTestuId1a',
          type: EGameType.Classic,
          timePlayed: 1,
          scoreWinner: 10,
          scoreLoser: -1
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: ['scoreLoser must not be less than 0.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
    })
    describe('timePlayed- float tests', () => {
      it('invalid number - string', async () => {
        const data = {
          loserId: 'aaaValidIdToTestuId1a',
          winnerId: 'abaValidIdToTestuId1a',
          type: EGameType.Classic,
          scoreLoser: 1,
          scoreWinner: 10,
          timePlayed: '0'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: [
            'timePlayed must not be less than 0.',
            'timePlayed must be a number.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid number - infinity', async () => {
        const data = {
          loserId: 'aaaValidIdToTestuId1a',
          winnerId: 'abaValidIdToTestuId1a',
          type: EGameType.Classic,
          scoreLoser: 1,
          scoreWinner: 10,
          timePlayed: Infinity
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: ['timePlayed must be a number.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid number - Nan', async () => {
        const data = {
          loserId: 'aaaValidIdToTestuId1a',
          winnerId: 'abaValidIdToTestuId1a',
          type: EGameType.Classic,
          scoreLoser: 1,
          scoreWinner: 10,
          timePlayed: NaN
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: [
            'timePlayed must not be less than 0.',
            'timePlayed must be a number.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('too low number', async () => {
        const data = {
          loserId: 'aaaValidIdToTestuId1a',
          winnerId: 'abaValidIdToTestuId1a',
          type: EGameType.Classic,
          scoreLoser: 1,
          scoreWinner: 10,
          timePlayed: -1
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: ['timePlayed must not be less than 0.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
    })
    describe('type - EGameType tests', () => {
      it('invalid type - Listambournian', async () => {
        const data = {
          loserId: 'aaaValidIdToTestuId1a',
          winnerId: 'abaValidIdToTestuId1a',
          type: 'Listambournian',
          scoreLoser: 1,
          scoreWinner: 10,
          timePlayed: 10
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateGameStatInput,
          data: ''
        }
        const res = {
          message: ['type must be a valid [object Object].'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
    })
  })
})
