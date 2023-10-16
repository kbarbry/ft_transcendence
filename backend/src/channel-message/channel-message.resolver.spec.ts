import { Test, TestingModule } from '@nestjs/testing'
import { ChannelMessageResolver } from './channel-message.resolver'
import { ChannelMessageService } from './channel-message.service'

describe('UserResolver', () => {
  let resolver: ChannelMessageResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelMessageResolver, ChannelMessageService]
    }).compile()

    resolver = module.get<ChannelMessageResolver>(ChannelMessageResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
