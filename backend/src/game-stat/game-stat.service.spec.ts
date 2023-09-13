import { Test, TestingModule } from '@nestjs/testing'
import { GameStatService } from './game-stat.service'

describe('GameStatService', () => {
  let service: GameStatService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameStatService]
    }).compile()

    service = module.get<GameStatService>(GameStatService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
