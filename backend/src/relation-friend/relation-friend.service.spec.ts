import { Test, TestingModule } from '@nestjs/testing'
import { RelationFriendService } from './relation-friend.service'

describe('RelationFriendService', () => {
  let relationFriendService: RelationFriendService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationFriendService]
    }).compile()

    relationFriendService = module.get<RelationFriendService>(
      RelationFriendService
    )
  })

  it('create a new relaton in DB', () => {
    const creatRet = relationFriendService.create('defined', 'defined')
    expect(creatRet).toBeDefined()
  })

  it("return all friend of a user's id", () => {
    const friends = relationFriendService.findAll('defined')
    expect(friends).toBeDefined()
  })

  it('verify if two users in WRONG order are friend', () => {
    relationFriendService
    expect(relationFriendService).toBeDefined()
  })

  it('verify if two users in RIGHT order are friend', () => {
    const isFriendRet = relationFriendService.isFriend('defined', 'definde')
    expect(isFriendRet).toBeDefined()
  })

  it("delete a relation by it's id", () => {
    const deletedRel = relationFriendService.deleteById('defined', 'defined')
    expect(deletedRel).toBeDefined()
  })
})
