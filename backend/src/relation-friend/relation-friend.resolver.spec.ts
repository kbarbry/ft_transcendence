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
/*
    tested all methods
    tested wrong id for findall => Return an empty array
    tested create Relation with wrong id => PrismaError
    tested iFriend with wrong Id => Return false(no error is that ok ?)
    Delete with wrong id return PrismaError
*/
