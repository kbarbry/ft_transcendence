import { Test, TestingModule } from '@nestjs/testing'
import { RelationBlockedService } from './relation-blocked.service'

describe('RelationBlockedService', () => {
  let service: RelationBlockedService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationBlockedService]
    }).compile()

    service = module.get<RelationBlockedService>(RelationBlockedService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
