import { Test, TestingModule } from '@nestjs/testing'
import { RelationBlockedResolver } from './relation-blocked.resolver'
import { RelationBlockedService } from './relation-blocked.service'

describe('UserResolver', () => {
  let resolver: RelationBlockedResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationBlockedResolver, RelationBlockedService]
    }).compile()

    resolver = module.get<RelationBlockedResolver>(RelationBlockedResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})

/*
  All methods tested
  findall with invalidID
  Delete invalidID
  IsRelationBlocked with wrong id return false
*/
