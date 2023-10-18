import { Test, TestingModule } from '@nestjs/testing'
import { ChannelMemberResolver } from './channel-member.resolver'

describe('ChannelMemberResolver', () => {
  let resolver: ChannelMemberResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelMemberResolver]
    }).compile()

    resolver = module.get<ChannelMemberResolver>(ChannelMemberResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})

//memo: no need to test service logic as it is in the service test
//create with wrong data/type for all
