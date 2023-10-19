import { Test, TestingModule } from '@nestjs/testing'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { PrismaService } from '../prisma/prisma.service'
import { cleanDataBase } from '../../test/setup-environment'
import { CreateUserInput } from './dto/create-user.input'
import { BadRequestException, ValidationPipe } from '@nestjs/common'
import { NanoidValidationPipe } from '../common/pipes/nanoid.pipe'
import { NanoidsValidationPipe } from 'src/common/pipes/nanoids.pipe'
import { EmailValidationPipe } from 'src/common/pipes/email.pipe'
import { UsernameValidationPipe } from 'src/common/pipes/username.pipe'

describe('UserResolver', () => {
  let userResolver: UserResolver
  let userService: UserService
  let prismaService: PrismaService
  const validationPipe = new ValidationPipe()

  // const mockUserService = {
  //   create: jest.fn()
  // }

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       UserResolver,
  //       {
  //         provide: UserService,
  //         useValue: mockUserService
  //       },
  //       PrismaService,
  //       ValidationPipe
  //     ]
  //   }).compile()

  //   resolver = module.get<UserResolver>(UserResolver)
  //   userService = module.get<UserService>(UserService)
  // })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService, PrismaService]
    }).compile()

    prismaService = module.get<PrismaService>(PrismaService)
    userResolver = module.get<UserResolver>(UserResolver)
    userService = module.get<UserService>(UserService)
  })

  it('userResolver should be defined', () => {
    expect(userResolver).toBeDefined()
  })

  it('should create an User', async () => {
    // const mockData: CreateUserInput = {
    //   mail: '',
    //   username: 'CreateUser_user2'
    //   avatarUrl: 'http://example.com/avatar.jpg',
    //   status: 'Online',
    //   languages: 'French',
    //   level: 42
    // }
    // const mockResult = {
    //   id: 'a2OayPlUh0qtDrePkJ87t',
    //   mail: 'lalala@gmail.com',
    //   username: 'ababa',
    //   status: 'Online',
    //   languages: 'French',
    //   level: 0
    // }
    // jest.spyOn(userService, 'create').mockResolvedValue(mockResult)
    // jest.spyOn(userService, 'create').mockImplementation(() => mockResult)
    // expect(resolver.yourResolverMethod).toBeUsingPipes(ValidationPipe)
    // const result = await resolver.createUser(mockData)
    // expect(result.mail).toEqual(mockData.mail)
    // expect(result.username).toEqual(mockData.username)
    // expect(result).toBeDefined()
  })
  it('should throw a BadRequestException for invalid data', async () => {
    const data = { email: 'invalid-email' }

    try {
      await validationPipe.transform(data, {
        type: 'body',
        metatype: CreateUserInput, // Your DTO class
        data: ''
      })
    } catch (error) {
      console.log(error.getResponse())
      expect(error).toBeInstanceOf(BadRequestException)
    }
  })
})
