import { Test, TestingModule } from '@nestjs/testing'
import { RelationRequestsService } from './relation-requests.service'

describe('RelationRequestsService', () => {
  let service: RelationRequestsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationRequestsService]
    }).compile()

    service = module.get<RelationRequestsService>(RelationRequestsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
