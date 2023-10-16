import { Test, TestingModule } from '@nestjs/testing'
import { PrivateMessageService } from './private-message.service'
import { PrivateMessageResolver } from './private-messgae.resolver'

describe('PrivateMessageResolver', () => {
  let resolver: PrivateMessageResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrivateMessageResolver, PrivateMessageService]
    }).compile()

    resolver = module.get<PrivateMessageResolver>(PrivateMessageResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
