import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from './user.service'

describe('UserService', () => {
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService] // Incluez le PrismaService dans les providers
    }).compile()

    userService = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(userService).toBeDefined()
  })

  it('should create a new user', async () => {
    const userData = {
      mail: 'example@example.com',
      username: 'example_user',
      password: 'password123',
      level: 0,
      avatarUrl: 'url_de_l_avatar_par_defaut'
      // Ajoutez d'autres données utilisateur si nécessaire
    }

    const createdUser = await userService.create(userData)
    expect(createdUser).toBeDefined()
    expect(createdUser.mail).toBe(userData.mail)
    expect(createdUser.username).toBe(userData.username)

    // Vous pouvez également ajouter d'autres assertions en fonction de vos besoins
  })
})
