import { Test, TestingModule } from '@nestjs/testing'
import { GameStatService } from './game-stat.service'
import { GameStatResolver } from './game-stat.resolver'

describe('UserResolver', () => {
  let resolver: GameStatResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameStatResolver, GameStatService]
    }).compile()

    resolver = module.get<GameStatResolver>(GameStatResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
