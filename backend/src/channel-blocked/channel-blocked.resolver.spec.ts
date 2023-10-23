import { Test, TestingModule } from '@nestjs/testing'
import { ChannelBlockedResolver } from './channel-blocked.resolver'

describe('ChannelBlockedResolver', () => {
  let resolver: ChannelBlockedResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelBlockedResolver]
    }).compile()

    resolver = module.get<ChannelBlockedResolver>(ChannelBlockedResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  //Create with wrong user id
  //Create with wrong channel id

  //Delete with wrong user id
  //Delete with wrong channel id

  //same test for find one and find all
})
