import { Test, TestingModule } from '@nestjs/testing'
import { RelationRequestsResolver } from './relation-request.resolver'
import { RelationRequestsService } from './relation-requests.service'

describe('UserResolver', () => {
  let resolver: RelationRequestsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationRequestsResolver, RelationRequestsService]
    }).compile()

    resolver = module.get<RelationRequestsResolver>(RelationRequestsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
