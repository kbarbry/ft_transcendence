import { Test, TestingModule } from '@nestjs/testing'
import { UserPresenceService } from './user-presence.service'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from '../user/user.service'

describe('UserPresenceService', () => {
  let userPresenceService: UserPresenceService
  let prismaService: PrismaService
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPresenceService, PrismaService]
    }).compile()

    userPresenceService = module.get<UserPresenceService>(UserPresenceService)
    //userService = module.get<UserService>(UserService)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  afterAll(async () => {
    await prismaService.userPresence.deleteMany({})
    await prismaService.user.deleteMany({})
    await prismaService.$disconnect()
  })

  describe('Test mutation UserPresence', () => {
    it('should be defined', () => {
      expect(UserPresenceService).toBeDefined()
    })
    it('Should create a new UserPresence', async () => {
      const userData = {
        mail: 'CreateUser@example.com',
        username: 'CreateUser_user',
        password: 'password123',
        level: 0,
        avatarUrl: 'url_de_l_avatar_par_defaut'
      }
      const user = await userService.create(userData)
      const userPresenceData = {
        connectedAt: new Date(),
        user: {
          connect: {
            id: user.id
          }
        }
      }

      const CreateUserPresence = await userPresenceService.create(
        userPresenceData
      )
      expect(CreateUserPresence).toBeDefined()
      expect(CreateUserPresence.connectedAt).toBe(userPresenceData.connectedAt)
    })
  })
})
