import { Test, TestingModule } from '@nestjs/testing'
import { UserPresenceResolver } from './user-presence.resolver'
import { UserPresenceService } from './user-presence.service'

describe('UserResolver', () => {
  let resolver: UserPresenceResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPresenceResolver, UserPresenceService]
    }).compile()

    resolver = module.get<UserPresenceResolver>(UserPresenceResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})

//check with invalid user
// check with invalid ID (lenght or ivanlid char)
// check userpresence creation
// disconnected at working
// FindOne working
// all methods working
