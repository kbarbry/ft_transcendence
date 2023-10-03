import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { PrismaService } from '../prisma/prisma.service'
import { cleanDataBase } from '../../test/setup-environment'

describe('UserController', () => {
  let controller: UserController
  let prismaService: PrismaService

  beforeEach(async () => {
    //**************************************************//
    //  MAKE IT CLEAN
    //**************************************************//

    //cleanDataBase(prismaService)

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController]
    }).compile()

    controller = module.get<UserController>(UserController)
  })
  afterAll(async () => {
    //cleanDataBase(prismaService)
    //await prismaService.$disconnect()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
