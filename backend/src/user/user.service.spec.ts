import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from './user.service'
import { disconnect } from 'process'

describe('Test UserService', () => {
  let userService: UserService
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService] // Incluez le PrismaService dans les providers
    }).compile()

    userService = module.get<UserService>(UserService)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  afterAll(async () => {
    await prismaService.user.deleteMany({})
    await prismaService.$disconnect()
  })

  describe('Tests mutation User', () => {
    it('should be defined', () => {
      expect(userService).toBeDefined()
    })
    const userData = {
      mail: 'CreateUser@example.com',
      username: 'CreateUser_user',
      password: 'password123',
      level: 0,
      avatarUrl: 'url_de_l_avatar_par_defaut'
      // Ajoutez d'autres données utilisateur si nécessaire
    }
    it('should create a new user', async () => {
      const createdUser = await userService.create(userData)
      expect(createdUser).toBeDefined()
      expect(createdUser.mail).toBe(userData.mail)
      expect(createdUser.username).toBe(userData.username)

      // Vous pouvez également ajouter d'autres assertions en fonction de vos besoins
    })
  })

  it('should update an existing user', async () => {
    // Créez un utilisateur de test pour la mise à jour
    const updateUserInput = {
      mail: 'updateUserExemple.com',
      username: 'UpdateUser_user',
      password: 'password123',
      level: 1,
      avatarUrl: 'url_de_l_avatar_par_defaut2'
    }

    const createdUser = await userService.create(updateUserInput)

    // Données de mise à jour
    const updateUserData = {
      username: 'new_username'
    }

    // Appelez la fonction de mise à jour
    const updatedUser = await userService.update(createdUser.id, updateUserData)

    // Vérifiez que l'utilisateur a été mis à jour correctement
    expect(updatedUser).toBeDefined()
    expect(updatedUser.id).toEqual(createdUser.id)
    expect(updatedUser.username).toEqual(updateUserData.username)
  })

  it('should delete an user', async () => {
    const deleteUserInput = {
      mail: 'deleteUser@exemple.com',
      username: 'deleteUser_User',
      password: 'password123',
      level: 1,
      avatarUrl: 'default'
    }

    const mustBeDeletedUser = await userService.create(deleteUserInput)
    await userService.delete(mustBeDeletedUser.id)

    const isDeleted = await userService.findOne(mustBeDeletedUser.id)
    expect(isDeleted).toBeNull
  })
})
