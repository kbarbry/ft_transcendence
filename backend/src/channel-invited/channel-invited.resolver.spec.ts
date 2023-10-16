import { Test, TestingModule } from '@nestjs/testing'
import { ChannelInvitedResolver } from './channel-invited.resolver'

describe('ChannelInvitedResolver', () => {
  let resolver: ChannelInvitedResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelInvitedResolver]
    }).compile()

    resolver = module.get<ChannelInvitedResolver>(ChannelInvitedResolver)
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
