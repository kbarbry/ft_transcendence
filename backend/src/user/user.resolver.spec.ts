import { Test, TestingModule } from '@nestjs/testing'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserInput } from './dto/create-user.input'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'
import { UpdateUserInput } from './dto/update-user.input'
import { ELanguage, EStatus } from '@prisma/client'

describe('UserResolver', () => {
  let userResolver: UserResolver
  const userService = {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn(),
    findOnebyMail: jest.fn(),
    findOneByUsername: jest.fn(),
    isUsernameUsed: jest.fn(),
    findUsersByUserIds: jest.fn()
  }
  let validationPipe: ValidationPipe

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        { provide: UserService, useValue: userService },
        PrismaService
      ]
    }).compile()

    userResolver = module.get<UserResolver>(UserResolver)
  })

  beforeEach(() => {
    validationPipe = new ValidationPipe()
    jest.clearAllMocks()
    userService.create.mockReset()
  })

  it('userResolver should be defined', () => {
    expect(userResolver).toBeDefined()
  })
  describe('Test Mutation', () => {
    it('createUser', async () => {
      const data: CreateUserInput = {
        mail: 'dhaya@gmail.com',
        username: 'dhaya',
        avatarUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        status: EStatus.DoNotDisturb,
        languages: ELanguage.English,
        level: 3
      }
      const resExpected = { id: '1', ...data }
      userService.create.mockReturnValue(resExpected)

      const result = await userResolver.createUser(data)

      expect(result).toStrictEqual(resExpected)
      expect(userService.create).toHaveBeenCalledWith(data)
    })
    it('updateUser', async () => {
      const data: UpdateUserInput = {
        username: 'dhaya2',
        avatarUrl: 'https://www.youtube.com/watch?v=dQw4w9Wgcac',
        status: EStatus.Idle,
        languages: ELanguage.French,
        level: 4
      }
      const resExpected = { id: '1', ...data }
      userService.update.mockReturnValue(resExpected)

      const result = await userResolver.updateUser('1', data)
      expect(result).toStrictEqual(resExpected)
      expect(userService.update).toHaveBeenCalledWith('1', data)
    })
    it('deleteUser', async () => {
      const resExpected = { id: '1' }
      userService.delete.mockReturnValue(resExpected)

      const result = await userResolver.deleteUser('1')
      expect(result).toStrictEqual(resExpected)
      expect(userService.delete).toHaveBeenCalledWith('1')
    })
  })

  describe('Test Query', () => {
    it('findOneUser', async () => {
      const resExpected = {
        id: '1',
        mail: 'dhaya@gmail.com',
        username: 'dhaya',
        avatarUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        status: EStatus.DoNotDisturb,
        languages: ELanguage.English,
        level: 3
      }
      userService.findOne.mockReturnValue(resExpected)

      const result = await userResolver.findOneUser('1')

      expect(result).toStrictEqual(resExpected)
      expect(userService.findOne).toHaveBeenCalledWith('1')
    })
    it('findOneUserbyMail', async () => {
      const resExpected = {
        id: '1',
        mail: 'dhaya@gmail.com',
        username: 'dhaya',
        avatarUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        status: EStatus.DoNotDisturb,
        languages: ELanguage.English,
        level: 3
      }
      userService.findOnebyMail.mockReturnValue(resExpected)

      const result = await userResolver.findOneUserbyMail('dhaya@gmail.com')

      expect(result).toStrictEqual(resExpected)
      expect(userService.findOnebyMail).toHaveBeenCalledWith('dhaya@gmail.com')
    })
    it('findOneUserByUsername', async () => {
      const resExpected = {
        id: '1',
        mail: 'dhaya@gmail.com',
        username: 'dhaya',
        avatarUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        status: EStatus.DoNotDisturb,
        languages: ELanguage.English,
        level: 3
      }
      userService.findOneByUsername.mockReturnValue(resExpected)

      const result = await userResolver.findOneUserByUsername('dhaya')

      expect(result).toStrictEqual(resExpected)
      expect(userService.findOneByUsername).toHaveBeenCalledWith('dhaya')
    })
    it('isUserUsernameUsed', async () => {
      userService.isUsernameUsed.mockReturnValue(true)

      const result = await userResolver.isUserUsernameUsed('dhaya')

      expect(result).toStrictEqual(true)
      expect(userService.isUsernameUsed).toHaveBeenCalledWith('dhaya')
    })
    it('findUsersByUserIds', async () => {
      const resExpected = [
        {
          id: '1',
          mail: 'dhaya@gmail.com',
          username: 'dhaya',
          avatarUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          status: EStatus.DoNotDisturb,
          languages: ELanguage.English,
          level: 3
        },
        {
          id: '3',
          mail: 'dhaya2@gmail.com',
          username: 'dhaya2',
          avatarUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          status: EStatus.DoNotDisturb,
          languages: ELanguage.English,
          level: 4
        },
        {
          id: '5',
          mail: 'dhaya3@gmail.com',
          username: 'dhaya3',
          avatarUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          status: EStatus.DoNotDisturb,
          languages: ELanguage.English,
          level: 5
        }
      ]
      userService.findUsersByUserIds.mockReturnValue(resExpected)

      const result = await userResolver.findUsersByUserIds(['1', '3', '5'])

      expect(result).toStrictEqual(resExpected)
      expect(userService.findUsersByUserIds).toHaveBeenCalledWith([
        '1',
        '3',
        '5'
      ])
    })
  })

  describe('Test ValidationPipe', () => {
    it('createUser', async () => {
      const data = {
        mail: 'dhaya@gmail.com',
        username: 'dhaya',
        avatarUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        status: EStatus.DoNotDisturb,
        languages: ELanguage.English,
        level: 3
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: CreateUserInput,
        data: ''
      }
      const response = await validationPipe.transform(data, metadata)
      expect(response).toStrictEqual(data)
    })
    it('updateUser', async () => {
      const data = {
        username: 'dhaya',
        avatarUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        status: EStatus.DoNotDisturb,
        languages: ELanguage.English,
        level: 3
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: UpdateUserInput,
        data: ''
      }
      const response = await validationPipe.transform(data, metadata)
      expect(response).toStrictEqual(data)
    })
  })

  describe('Test Error', () => {
    describe('mail - email tests (mandatory)', () => {
      it('invalid email - no mail', async () => {
        const data = {
          username: 'dhaya'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateUserInput,
          data: ''
        }
        const res = {
          message: ['mail must be a valid email address.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid email - null', async () => {
        const data = {
          mail: null,
          username: 'dhaya'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateUserInput,
          data: ''
        }
        const res = {
          message: ['mail must be a valid email address.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it("invalid email - ''", async () => {
        const data = {
          mail: '',
          username: 'dhaya'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateUserInput,
          data: ''
        }
        const res = {
          message: ['mail must be a valid email address.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid email - @gmail.com', async () => {
        const data = {
          mail: '@gmail.com',
          username: 'dhaya'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateUserInput,
          data: ''
        }
        const res = {
          message: ['mail must be a valid email address.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid email - dhaya@.com', async () => {
        const data = {
          mail: 'dhaya@.com',
          username: 'dhaya'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateUserInput,
          data: ''
        }
        const res = {
          message: ['mail must be a valid email address.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid email - dhaya@gmail.c', async () => {
        const data = {
          mail: 'dhaya@gmail.c',
          username: 'dhaya'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateUserInput,
          data: ''
        }
        const res = {
          message: ['mail must be a valid email address.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
    })

    describe('username - string tests (mandatory)', () => {
      it('invalid username - no username', async () => {
        const data = {
          mail: 'dhaya@gmail.com'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateUserInput,
          data: ''
        }
        const res = {
          message: [
            'username must be between 1 and 30 characters long.',
            'username must be a string.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid username - null', async () => {
        const data = {
          mail: 'dhaya@gmail.com',
          username: null
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateUserInput,
          data: ''
        }
        const res = {
          message: [
            'username must be between 1 and 30 characters long.',
            'username must be a string.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('too short string', async () => {
        const data = {
          mail: 'dhaya@gmail.com',
          username: ''
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateUserInput,
          data: ''
        }
        const res = {
          message: ['username must be between 1 and 30 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('too long string', async () => {
        const data: CreateUserInput = {
          mail: 'dhaya@gmail.com',
          username: 'looooooooooooooooooong username'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateUserInput,
          data: ''
        }
        const res = {
          message: ['username must be between 1 and 30 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
    })

    describe('avatarUrl - url tests', () => {
      it('invalid url', async () => {
        const data: CreateUserInput = {
          mail: 'dhaya@gmail.com',
          username: 'dhaya',
          avatarUrl: 'lala'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateUserInput,
          data: ''
        }
        const res = {
          message: ['avatarUrl must be a valid URL.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('too short url', async () => {
        const data: CreateUserInput = {
          mail: 'dhaya@gmail.com',
          username: 'dhaya',
          avatarUrl: ''
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateUserInput,
          data: ''
        }
        const res = {
          message: [
            'avatarUrl must be between 1 and 2083 characters long.',
            'avatarUrl must be a valid URL.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('too long url', async () => {
        const data: CreateUserInput = {
          mail: 'dhaya@gmail.com',
          username: 'dhaya',
          avatarUrl:
            'http://www.reallylong.link/rll/YpqBs8onVu3lurGvSr92X6ynlxX9Evl5pgzbmNhJ62l8S0cl2qPQlGm/Q3SoXwxoisIuLhvqaLmXt4kk8HffFs429uyBsafy0/sWNcXKprl95h/Q_x1/aUJpdSeogSXiwZE/DBhv7G2Y1VuwuErF55iY7PFf9qnHaiux3SZtHPSEgR59pHRV967Fm17hxN_NMvNqdXwqBMJlesZCwXQgZO6aiV4vG3mQqmM2v0BbtEJOSLGr04Xbx7ZdWf8wohlYwezd4EQIYTfoQjzh5DuGxiM43O7lmDX_ELdENXXk12hR4tqX1Q4GjMpNM0YGvDje/grvxlmDihsPN0h6vcnEWnNWbQT1kiQ918yz/t6X2CU7syhcof9TwjFIVie_QTIuVd4x786Vl2QJjf0vN2cGasDgp4RdyrPgz/5NmH20HxnE0H4dh7RWks_Fy56leMPWUUmXueHpUJ9FKCjr5NhEARYmiFrs_QN7gk_GqbVXwF8B5ZpWu1JQ81Ima8Zxv1h0kcE0rcZCrCQvAx4MG7UblFzzQeus8_tgtBgRvZ79h/hJApFZgETR5XdOZSFofOO_MXa46RQO42Q5YiPkefDIakAZ4rrvJDcs/JvjI_Cg47TGwVNiXiAOA/YGmn932_GEVecNFkLjhme28JekOXZLeWDanNVvDoViNQl2y20li_Z8uZO9F5TwbQYfK/wN_WvOOFV9abv1sybjX/P/xDahBLKJZMbPvMQzpYaJwW_f_AaGDxzTBhUgPWGuWh37GheNlhMnqkWYhS/EjBmP6QqXF7IK9ohO5TEM0sQlq/bNj2Yrmgzzelh9i6ar56WREzi2tE9/6zcR_W5zJszrXBKbGpqy9D67rbROYciD6oiYg2JgLf8QuJqJhjZHghDJd51D5MP7l5Bjdcpzmg3tBzNJZ4fIbbN4DocszjEDltifxpm3kR4bTG3v3TrbpyLAi0/7BPb9jixZscybLBcLgDmbwSUdbZxWGpEFdjAz/wIB_BHuY5JENJqZHD/zOtItWUI4XAgUugA_Xr8GyLBg9c_pfiNvsj0Lb7dKMDcfc3F9EMnhax1Az66/2XoqweE0DwM0MGNRqS9ddeQZTUoS13hOmX8k1QGhv48mdWuq1KHrwRJ4ozHGuZ_L0mOmPYynlBBIbWlwsKftbHhh/I11wlBNCxecs5eBhjxOUYi4QS7XpdlCtcZndLE8yq9Ve8DithvHtUmrbek_MCMnes9zG3rbwZorEL9S0_rDj_i0agvHq9/g2vuhef4CFgxTUNFM92sI5oPtRr7HDARyJjwXKYgWJ7m3hNtNcL5IzuN5euhDoI2LF8JItgeJvMms3UQQIAAKDOnjU4JjdQBXM2tFTN4BNH3/7YriTceppAuqp9vD/UOhMDZckHSFZMF3DuSxHN7p4v/OhAyrCuUhqtbROCebK/HXyEndhMqJoQicfUCXfX_9jkQc5eEiK2Ij4jAW4GhXYJftQjVPYtP7PiJTxVC3Mg7GTXwfZhnEoBAFG2H3vHrCkUaTta5/n1wckR_OppIt/ApgKZHGPQCj8OCqfAwQZwHq6XEVkh0RfCfmA_gJoanILoveYou0xy5c57hs9WSOx9T_fSE9pbBI7ZQL58I7yFRAf4WDnuUpY8nK8h2Wgp4a6iUZQZ0_AIuppPZfXj7p_EWKaiBshejslaXVPRnr4X8O6P4qwu_R_vVp0CVlFhPCCTRf0UHSp7gpjfeLcBpkghKnEOKk3cF0KFlcRZPxCAdDIns_l5e10OQLwEKuaYYa4HPaBNEFHbG3TnIlia7jTE2IZgSY/OV0uTc9t5xkO1d8/VDdldGVEC8C31kpwlft6odsilh/BOfsj7/YWP5Jq5wfwfsScnDrA1F6l_M1yoH9lICMLVrIDuvVzFmbBfIzEv5UFlR_skhmv5AA3Ix7Qr5K6jQ_k0qUtl5DI6TyODeoz5liYvIA_G74Hg1wsoKlq_veryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyylongURLyeahIknow'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateUserInput,
          data: ''
        }
        const res = {
          message: [
            'avatarUrl must be between 1 and 2083 characters long.',
            'avatarUrl must be a valid URL.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
    })

    describe('status - EStatus tests', () => {
      it('invalid status - DisturbMeYeahGoOn', async () => {
        const data = {
          mail: 'dhaya@gmail.com',
          username: 'dhaya',
          status: 'DisturbMeYeahGoOn'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateUserInput,
          data: ''
        }
        const res = {
          message: ['status must be a valid EStatus.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
    })
    describe('language - ELanguage tests', () => {
      it('invalid status - Listambournian', async () => {
        const data = {
          mail: 'dhaya@gmail.com',
          username: 'dhaya',
          languages: 'Listambournian'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateUserInput,
          data: ''
        }
        const res = {
          message: ['languages must be a valid ELanguage.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
    })
    describe('level - float tests', () => {
      it('invalid number - string', async () => {
        const data = {
          mail: 'dhaya@gmail.com',
          username: 'dhaya',
          level: '0'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateUserInput,
          data: ''
        }
        const res = {
          message: [
            'level must not be less than 0.',
            'level must be a number.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid number - infinity', async () => {
        const data = {
          mail: 'dhaya@gmail.com',
          username: 'dhaya',
          level: Infinity
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateUserInput,
          data: ''
        }
        const res = {
          message: ['level must be a number.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('invalid number - Nan', async () => {
        const data = {
          mail: 'dhaya@gmail.com',
          username: 'dhaya',
          level: NaN
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateUserInput,
          data: ''
        }
        const res = {
          message: [
            'level must not be less than 0.',
            'level must be a number.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
      it('too low number', async () => {
        const data = {
          mail: 'dhaya@gmail.com',
          username: 'dhaya',
          level: -1
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateUserInput,
          data: ''
        }
        const res = {
          message: ['level must not be less than 0.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
    })
  })
})
