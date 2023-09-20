import { Test, TestingModule } from '@nestjs/testing'
import { UserPresenceService } from './user-presence.service'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from '../user/user.service'

//todo Faire une fonction spéciale pour Disconnect (Looks like update disconnect)

describe('UserPresenceService', () => {
  let userPresenceService: UserPresenceService
  let prismaService: PrismaService
  let userService: UserService
  let Createduser: any
  let CreateUserPresence: any
  let userPresenceData: any

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPresenceService, PrismaService, UserService]
    }).compile()

    userPresenceService = module.get<UserPresenceService>(UserPresenceService)
    userService = module.get<UserService>(UserService)
    prismaService = module.get<PrismaService>(PrismaService)

    //**************************************************//
    //  USER CREATION
    //**************************************************//

    const userData = {
      mail: 'CreateUser@example.com',
      username: 'CreateUser_user',
      password: 'password123',
      level: 0,
      avatarUrl: 'url_de_l_avatar_par_defaut'
    }
    const Createduser = await prismaService.$executeRaw`
  INSERT INTO "user" (mail, username, password, level, avatarUrl)
  VALUES (${userData.mail}, ${userData.username}, ${userData.password}, 0, ${userData.avatarUrl})
  RETURNING id;
`
    //const userId = Createduser[0]?.id
    //console.log("Nouvel utilisateur inséré avec l'ID :", userId)
    // const number = await prismaService.$executeRaw(
    //   'INSERT INTO User (mail, username, password, level, avatarUrl) VALUES (?, ?, ?, ?, ?)',
    //   userData.mail,
    //   userData.username,
    //   userData.password,
    //   userData.level,
    //   userData.avatarUrl
    // )

    //user = await userService.create(userData)

    //**************************************************//
    //  USER PRESENCE CREATION
    //**************************************************//

    userPresenceData = {
      connectedAt: new Date(),
      user: {
        connect: {
          //id: Createduser.id
        }
      }
    }
    CreateUserPresence = await userPresenceService.create(userPresenceData)
  })

  // afterAll(async () => {
  //   await prismaService.userPresence.deleteMany({})
  //   await prismaService.user.deleteMany({})
  //   await prismaService.$disconnect()
  // })

  describe('Test UserPresence', () => {
    describe('Test UserPresence Mutation', () => {
      it('should be defined', () => {
        expect(UserPresenceService).toBeDefined()
      })
      it('Should create a new UserPresence', async () => {
        expect(CreateUserPresence).toBeDefined()
        expect(CreateUserPresence.connectedAt).toStrictEqual(
          userPresenceData.connectedAt
        )
      })
      // it('should update user presence', async () => {
      //   const updatedData = {
      //     disconnectedAt: new Date(),
      //     connectedAt: new Date()
      //   }
      //   // const updatedUserPresence = await userPresenceService.update(
      //   //   CreateUserPresence.id,
      //   //   updatedData
      //   // )
      //   // const updatedUserPresence =
      //   //   await prismaService.$executeRaw`INSERT INTO User SET active = true WHERE emailValidated = true`
      //   // expect(updatedUserPresence).toBeDefined()
      //   // expect(updatedUserPresence.disconnectedAt).toEqual(
      //   //   updatedData.disconnectedAt
      //   // )
      //   expect(updatedUserPresence.connectedAt).toEqual(updatedData.connectedAt)
      // })
      //       it('should delete UserPresence', async () => {
      //         const tmp = await userPresenceService.create(userPresenceData)
      //         await userPresenceService.delete(tmp.id)
      //         const isTmp = await userPresenceService.findOne(tmp.id)
      //         expect(isTmp).toBeNull()
      //       })
      //     })

      //     describe('Testing user Query', () => {
      //       it('should find ValidUserPresence && not WrongUserPresence', async () => {
      //         const ValidUserPresence = await userPresenceService.findOne(
      //           CreateUserPresence.id
      //         )
      //         const WrongUserPresence = await userPresenceService.findOne('testwrong')
      //         expect(ValidUserPresence).toBeDefined()
      //         expect(WrongUserPresence).toBeNull()
      //       })
      //       it('should find ValidUserPresence Array && not WrongUserPresence Array', async () => {
      //         const tmp = await userPresenceService.create(userPresenceData)
      //         const ValidUserPresence = await userPresenceService.findAll(
      //           CreateUserPresence.id
      //         )
      //         ValidUserPresence.push(tmp)
      //         expect(ValidUserPresence).toBeDefined()
      //         expect(Array.isArray(ValidUserPresence)).toBeTruthy()
      //         expect(ValidUserPresence.length).toBeGreaterThan(0)
      //       })
      //       it('should update the disconnect time', async () => {
      //         const updatedData = {
      //           disconnectedAt: new Date('12/01')
      //         }
      //         const updateDisconnected = await userPresenceService.disconnected(
      //           CreateUserPresence.id,
      //           updatedData.disconnectedAt
      //         )
      //         expect(updateDisconnected.disconnectedAt).toEqual(
      //           updatedData.disconnectedAt
      //         )
      //       })
      //       it('should update the connected time', async () => {
      //         const updatedData = {
      //           connectedAt: new Date(123)
      //         }
      //         const updateConnected = await userPresenceService.connected(
      //           CreateUserPresence.id,
      //           updatedData.connectedAt
      //         )
      //         expect(updateConnected.connectedAt).toEqual(updatedData.connectedAt)
      //       })
    })
  })
})
