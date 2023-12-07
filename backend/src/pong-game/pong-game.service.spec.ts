import { Test, TestingModule } from '@nestjs/testing'
import { PongGameService } from './pong-game.service'

describe('PongGameService', () => {
  let service: PongGameService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PongGameService]
    }).compile()

    service = module.get<PongGameService>(PongGameService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
