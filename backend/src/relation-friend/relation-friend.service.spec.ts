import { Test, TestingModule } from '@nestjs/testing'
import { RelationFriendService } from './relation-friend.service'

describe('RelationFriendService', () => {
  let service: RelationFriendService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationFriendService]
    }).compile()

    service = module.get<RelationFriendService>(RelationFriendService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
