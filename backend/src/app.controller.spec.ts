import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'
import { cleanDataBase } from '../test/setup-environment'

describe('AppController', () => {
  let appController: AppController
  let prismaService: PrismaService

  beforeEach(async () => {
    //**************************************************//
    //  MAKE IT CLEAN
    //**************************************************//
    //await cleanDataBase(prismaService)
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    }).compile()

    appController = app.get<AppController>(AppController)
  })
  afterAll(async () => {
    //cleanDataBase(prismaService)
    //await prismaService.$disconnect()
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!')
    })
  })
})
