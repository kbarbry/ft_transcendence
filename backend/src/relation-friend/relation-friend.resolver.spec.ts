import { Test, TestingModule } from '@nestjs/testing'
import { RelationFriendResolver } from './relation-friend.resolver'
import { RelationFriendService } from './relation-friend.service'

describe('UserResolver', () => {
  let resolver: RelationFriendResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationFriendResolver, RelationFriendService]
    }).compile()

    resolver = module.get<RelationFriendResolver>(RelationFriendResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
