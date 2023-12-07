import { Test, TestingModule } from '@nestjs/testing'
import { PongGameResolver } from './pong-game.resolver'

describe('PongGameResolver', () => {
  let resolver: PongGameResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PongGameResolver]
    }).compile()

    resolver = module.get<PongGameResolver>(PongGameResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
