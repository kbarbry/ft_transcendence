import { Test, TestingModule } from '@nestjs/testing'
import { ChannelResolver } from './channel.resolver'
import { ChannelService } from './channel.service'
import { EChannelType } from '@prisma/client'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'
import { CreateChannelInput } from './dto/create-channel.input'
import { PrismaService } from '../prisma/prisma.service'
import {
  UpdateChannelInput,
  UpdateChannelOwnerIdInput
} from './dto/update-channel.input'

describe('ChannelResolver', () => {
  let channelResolver: ChannelResolver
  const channelService = {
    create: jest.fn(),
    update: jest.fn(),
    updateOwner: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn(),
    findAllThatContain: jest.fn(),
    findOwner: jest.fn(),
    findAllChannelOfOwner: jest.fn()
  }
  let validationPipe: ValidationPipe

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelResolver,
        { provide: ChannelService, useValue: channelService },
        PrismaService
      ]
    }).compile()

    channelResolver = module.get<ChannelResolver>(ChannelResolver)
  })

  beforeEach(async () => {
    validationPipe = new ValidationPipe()
    jest.clearAllMocks()
    channelService.create.mockReset()
  })

  it('channelResolver should be defined', () => {
    expect(channelResolver).toBeDefined()
  })

  describe('Test Mutation', () => {
    it('createChannel', async () => {
      const data: CreateChannelInput = {
        name: 'Channel Name',
        avatarUrl: 'http://www.pic.com/pic.png',
        topic: 'The topic',
        password: 'Yes',
        ownerId: '564ayPlUh0qtDrePkJ87t',
        maxUsers: 10,
        type: EChannelType.Protected
      }

      const resExpected = { id: '1', ...data }
      channelService.create.mockReturnValue(resExpected)
      const result = await channelResolver.createChannel(data)

      expect(result).toStrictEqual(resExpected)
      expect(channelService.create).toHaveBeenCalledWith(data)
    })

    it('updateChannel', async () => {
      const data: UpdateChannelInput = {
        name: 'Channel Name',
        avatarUrl: 'http://www.pic.com/pic.png',
        topic: 'The topic',
        password: 'Yes',
        maxUsers: 10,
        type: EChannelType.Protected
      }

      const resExpected = { id: '1', ...data }
      channelService.update.mockReturnValue(resExpected)
      const result = await channelResolver.updateChannel('1', data)

      expect(result).toStrictEqual(resExpected)
      expect(channelService.update).toHaveBeenCalledWith('1', data)
    })

    it('updateChannelOwner', async () => {
      const data: UpdateChannelOwnerIdInput = {
        ownerId: '564ayPlUh0qtDrePkJ87t'
      }
      const resExpected = {
        id: '1',
        name: 'Channel Name',
        avatarUrl: 'http://www.pic.com/pic.png',
        topic: 'The topic',
        password: 'Yes',
        ownerId: '564ayPlUh0qtDrePkJ87t',
        maxUsers: 10,
        type: EChannelType.Protected
      }

      channelService.updateOwner.mockReturnValue(resExpected)
      const result = await channelResolver.updateChannelOwner('1', data)

      expect(result).toStrictEqual(resExpected)
      expect(channelService.updateOwner).toHaveBeenCalledWith('1', data)
    })

    it('deleteChannel', async () => {
      const data = {
        name: 'Channel Name',
        avatarUrl: 'http://www.pic.com/pic.png',
        topic: 'The topic',
        password: 'Yes',
        ownerId: '564ayPlUh0qtDrePkJ87t',
        maxUsers: 10,
        type: EChannelType.Protected
      }

      const resExpected = { id: '1', ...data }
      channelService.delete.mockReturnValue(resExpected)
      const result = await channelResolver.deleteChannel('1')

      expect(result).toStrictEqual(resExpected)
      expect(channelService.delete).toHaveBeenCalledWith('1')
    })
  })

  describe('Test Query', () => {
    it('findOneChannel', async () => {
      const resExpected = {
        name: 'Channel Name',
        avatarUrl: 'http://www.pic.com/pic.png',
        topic: 'The topic',
        password: 'Yes',
        ownerId: '564ayPlUh0qtDrePkJ87t',
        maxUsers: 10,
        type: EChannelType.Protected
      }

      channelService.findOne.mockReturnValue(resExpected)
      const result = await channelResolver.findOneChannel('1')

      expect(result).toStrictEqual(resExpected)
      expect(channelService.findOne).toHaveBeenCalledWith('1')
    })

    it('findAllChannelThatContain', async () => {
      const resExpected = [
        {
          name: 'Channel Name 1',
          avatarUrl: 'http://www.pic.com/pic.png',
          topic: 'The topic 0',
          password: null,
          ownerId: '564ayPlUh0qtDrePkJ87t',
          maxUsers: 10,
          type: EChannelType.Protected
        },
        {
          name: 'Channel Name 2',
          avatarUrl: 'http://www.pic.com/pic.png',
          topic: 'The topic 2',
          password: null,
          ownerId: '564ayPlUh0qtDrePkJ87t',
          maxUsers: 10,
          type: EChannelType.Protected
        }
      ]

      channelService.findAllThatContain.mockReturnValue(resExpected)
      const result = await channelResolver.findAllChannelThatContain(
        'Channel Name'
      )

      expect(result).toStrictEqual(resExpected)
      expect(channelService.findAllThatContain).toHaveBeenCalledWith(
        'Channel Name'
      )
    })

    it('findChannelOwner', async () => {
      const resExpected = {
        ownerId: '1'
      }

      channelService.findOwner.mockReturnValue(resExpected)
      const result = await channelResolver.findChannelOwner('1')

      expect(result).toStrictEqual(resExpected)
      expect(channelService.findOwner).toHaveBeenCalledWith('1')
    })

    it('findAllChannelOfOwner', async () => {
      const resExpected = [
        {
          name: 'Channel Name 1',
          avatarUrl: 'http://www.pic.com/pic.png',
          topic: 'The topic 0',
          password: null,
          ownerId: '1',
          maxUsers: 10,
          type: EChannelType.Protected
        },
        {
          name: 'Channel Name 2',
          avatarUrl: 'http://www.pic.com/pic.png',
          topic: 'The topic 2',
          password: null,
          ownerId: '1',
          maxUsers: 10,
          type: EChannelType.Protected
        }
      ]

      channelService.findAllChannelOfOwner.mockReturnValue(resExpected)
      const result = await channelResolver.findAllChannelOfOwner('1')

      expect(result).toStrictEqual(resExpected)
      expect(channelService.findAllChannelOfOwner).toHaveBeenCalledWith('1')
    })
  })

  describe('Test ValidationPipe', () => {
    it('CreateChannel', async () => {
      const data = {
        name: 'Channel Name',
        avatarUrl: 'http://www.pic.com/pic.png',
        topic: 'The topic',
        password: 'Password59!',
        ownerId: '564ayPlUh0qtDrePkJ87t',
        maxUsers: 10,
        type: EChannelType.Protected
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: CreateChannelInput,
        data: ''
      }

      const response = await validationPipe.transform(data, metadata)

      expect(response).toStrictEqual(data)
    })

    it('UpdateChannel', async () => {
      const data = {
        name: 'Channel Name',
        avatarUrl: 'http://www.pic.com/pic.png',
        topic: 'The topic',
        password: 'Password59!',
        maxUsers: 10,
        type: EChannelType.Protected
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: UpdateChannelInput,
        data: ''
      }

      const response = await validationPipe.transform(data, metadata)

      expect(response).toStrictEqual(data)
    })

    it('UpdateChannelOwnerId', async () => {
      const data = {
        ownerId: '564ayPlUh0qtDrePkJ87t'
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: UpdateChannelOwnerIdInput,
        data: ''
      }

      const response = await validationPipe.transform(data, metadata)

      expect(response).toStrictEqual(data)
    })
  })

  describe('Test Error', () => {
    it('Empty data', async () => {
      const data = {}
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: CreateChannelInput,
        data: ''
      }
      const res = {
        message: [
          'name must be between 1 and 30 characters long and must only contain letters, number and single spaces.',
          'ownerId must be exactly 21 characters long.',
          'Invalid nanoid characters.'
        ],
        error: 'Bad Request',
        statusCode: 400
      }
      const thrownError = await validationPipe
        .transform(data, metadata)
        .catch((error) => error)
      expect(thrownError.getResponse()).toStrictEqual(res)
    })

    describe('name - string tests (mandatory)', () => {
      it('name - too long', async () => {
        const data = {
          name: 'channel name is Boooooooooooooooooob',
          ownerId: '564ayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: [
            'name must be between 1 and 30 characters long and must only contain letters, number and single spaces.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('name - empty', async () => {
        const data = {
          name: '',
          ownerId: '564ayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: [
            'name must be between 1 and 30 characters long and must only contain letters, number and single spaces.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('name - null', async () => {
        const data = {
          name: null,
          ownerId: '564ayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: [
            'name must be between 1 and 30 characters long and must only contain letters, number and single spaces.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('name - undefined', async () => {
        const data = {
          ownerId: '564ayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: [
            'name must be between 1 and 30 characters long and must only contain letters, number and single spaces.'
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

    describe('avatarUrl - url tests', () => {
      it('avatarUrl - no http', async () => {
        const data = {
          avatarUrl: '//www.pic.com/pic.png',
          name: 'Channel Name',
          ownerId: '564ayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
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

      it('avatarUrl - bad format', async () => {
        const data = {
          avatarUrl: 'http://pic/pic.png',
          name: 'Channel Name',
          ownerId: '564ayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
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

      it('avatarUrl - too long', async () => {
        const data = {
          avatarUrl:
            'http://www.reallylong.link/rll/YpqBs8onVu3lurGvSr92X6ynlxX9Evl5pgzbmNhJ62l8S0cl2qPQlGm/Q3SoXwxoisIuLhvqaLmXt4kk8HffFs429uyBsafy0/sWNcXKprl95h/Q_x1/aUJpdSeogSXiwZE/DBhv7G2Y1VuwuErF55iY7PFf9qnHaiux3SZtHPSEgR59pHRV967Fm17hxN_NMvNqdXwqBMJlesZCwXQgZO6aiV4vG3mQqmM2v0BbtEJOSLGr04Xbx7ZdWf8wohlYwezd4EQIYTfoQjzh5DuGxiM43O7lmDX_ELdENXXk12hR4tqX1Q4GjMpNM0YGvDje/grvxlmDihsPN0h6vcnEWnNWbQT1kiQ918yz/t6X2CU7syhcof9TwjFIVie_QTIuVd4x786Vl2QJjf0vN2cGasDgp4RdyrPgz/5NmH20HxnE0H4dh7RWks_Fy56leMPWUUmXueHpUJ9FKCjr5NhEARYmiFrs_QN7gk_GqbVXwF8B5ZpWu1JQ81Ima8Zxv1h0kcE0rcZCrCQvAx4MG7UblFzzQeus8_tgtBgRvZ79h/hJApFZgETR5XdOZSFofOO_MXa46RQO42Q5YiPkefDIakAZ4rrvJDcs/JvjI_Cg47TGwVNiXiAOA/YGmn932_GEVecNFkLjhme28JekOXZLeWDanNVvDoViNQl2y20li_Z8uZO9F5TwbQYfK/wN_WvOOFV9abv1sybjX/P/xDahBLKJZMbPvMQzpYaJwW_f_AaGDxzTBhUgPWGuWh37GheNlhMnqkWYhS/EjBmP6QqXF7IK9ohO5TEM0sQlq/bNj2Yrmgzzelh9i6ar56WREzi2tE9/6zcR_W5zJszrXBKbGpqy9D67rbROYciD6oiYg2JgLf8QuJqJhjZHghDJd51D5MP7l5Bjdcpzmg3tBzNJZ4fIbbN4DocszjEDltifxpm3kR4bTG3v3TrbpyLAi0/7BPb9jixZscybLBcLgDmbwSUdbZxWGpEFdjAz/wIB_BHuY5JENJqZHD/zOtItWUI4XAgUugA_Xr8GyLBg9c_pfiNvsj0Lb7dKMDcfc3F9EMnhax1Az66/2XoqweE0DwM0MGNRqS9ddeQZTUoS13hOmX8k1QGhv48mdWuq1KHrwRJ4ozHGuZ_L0mOmPYynlBBIbWlwsKftbHhh/I11wlBNCxecs5eBhjxOUYi4QS7XpdlCtcZndLE8yq9Ve8DithvHtUmrbek_MCMnes9zG3rbwZorEL9S0_rDj_i0agvHq9/g2vuhef4CFgxTUNFM92sI5oPtRr7HDARyJjwXKYgWJ7m3hNtNcL5IzuN5euhDoI2LF8JItgeJvMms3UQQIAAKDOnjU4JjdQBXM2tFTN4BNH3/7YriTceppAuqp9vD/UOhMDZckHSFZMF3DuSxHN7p4v/OhAyrCuUhqtbROCebK/HXyEndhMqJoQicfUCXfX_9jkQc5eEiK2Ij4jAW4GhXYJftQjVPYtP7PiJTxVC3Mg7GTXwfZhnEoBAFG2H3vHrCkUaTta5/n1wckR_OppIt/ApgKZHGPQCj8OCqfAwQZwHq6XEVkh0RfCfmA_gJoanILoveYou0xy5c57hs9WSOx9T_fSE9pbBI7ZQL58I7yFRAf4WDnuUpY8nK8h2Wgp4a6iUZQZ0_AIuppPZfXj7p_EWKaiBshejslaXVPRnr4X8O6P4qwu_R_vVp0CVlFhPCCTRf0UHSp7gpjfeLcBpkghKnEOKk3cF0KFlcRZPxCAdDIns_l5e10OQLwEKuaYYa4HPaBNEFHbG3TnIlia7jTE2IZgSY/OV0uTc9t5xkO1d8/VDdldGVEC8C31kpwlft6odsilh/BOfsj7/YWP5Jq5wfwfsScnDrA1F6l_M1yoH9lICMLVrIDuvVzFmbBfIzEv5UFlR_skhmv5AA3Ix7Qr5K6jQ_k0qUtl5DI6TyODeoz5liYvIA_G74Hg1wsoKlq_veryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyylongURLyeahIknow',
          name: 'Channel Name',
          ownerId: '564ayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
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

    describe('topic - string tests', () => {
      it('topic - too long', async () => {
        const data = {
          name: 'Channel Name',
          topic:
            'my topic is loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooog',
          ownerId: '564ayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: ['topic must be between 1 and 1024 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('topic - empty', async () => {
        const data = {
          name: 'Channel Name',
          topic: '',
          ownerId: '564ayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: ['topic must be between 1 and 1024 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })
    })

    describe('password - string tests', () => {
      it('password - too long', async () => {
        const data = {
          name: 'Channel Name',
          password: 'loooooooooooooooooooooooooooooooooooooooooooooooong',
          ownerId: '564ayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: [
            "password must be between 8 and 50 characters and contain at least 1 lowercase character, 1 uppercase character, 1 number and 1 special character (all special characters aren't authorized.)"
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('password - empty', async () => {
        const data = {
          name: 'Channel Name',
          password: '',
          ownerId: '564ayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: [
            "password must be between 8 and 50 characters and contain at least 1 lowercase character, 1 uppercase character, 1 number and 1 special character (all special characters aren't authorized.)"
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('password - no uppercase', async () => {
        const data = {
          name: 'Channel Name',
          password: 'password59!',
          ownerId: '564ayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: [
            "password must be between 8 and 50 characters and contain at least 1 lowercase character, 1 uppercase character, 1 number and 1 special character (all special characters aren't authorized.)"
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('password - no lowercase', async () => {
        const data = {
          name: 'Channel Name',
          password: 'PASSWORD59!',
          ownerId: '564ayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: [
            "password must be between 8 and 50 characters and contain at least 1 lowercase character, 1 uppercase character, 1 number and 1 special character (all special characters aren't authorized.)"
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('password - no special character', async () => {
        const data = {
          name: 'Channel Name',
          password: 'Password59',
          ownerId: '564ayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: [
            "password must be between 8 and 50 characters and contain at least 1 lowercase character, 1 uppercase character, 1 number and 1 special character (all special characters aren't authorized.)"
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('password - no number', async () => {
        const data = {
          name: 'Channel Name',
          password: 'Password!',
          ownerId: '564ayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: [
            "password must be between 8 and 50 characters and contain at least 1 lowercase character, 1 uppercase character, 1 number and 1 special character (all special characters aren't authorized.)"
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('password - invalid special character', async () => {
        const data = {
          name: 'Channel Name',
          password: 'Password59°',
          ownerId: '564ayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: [
            "password must be between 8 and 50 characters and contain at least 1 lowercase character, 1 uppercase character, 1 number and 1 special character (all special characters aren't authorized.)"
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

    describe('ownerId - nanoid tests (mandatory)', () => {
      it('ownerId - invalid characters', async () => {
        const data = {
          name: 'Channel Name',
          ownerId: '564ayPlUh0qtDrePkJ87;'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: ['Invalid nanoid characters.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('ownerId - too short', async () => {
        const data = {
          name: 'Channel Name',
          ownerId: '564ayPlUh0qt'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: ['ownerId must be exactly 21 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('ownerId - too long', async () => {
        const data = {
          name: 'Channel Name',
          ownerId: '564ayPlUh0qtDrePkJ87ttttttt'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: ['ownerId must be exactly 21 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('ownerId - wrong type', async () => {
        const data = {
          name: 'Channel Name',
          ownerId: 12
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: [
            'ownerId must be exactly 21 characters long.',
            'Invalid nanoid characters.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('ownerId - null', async () => {
        const data = {
          name: 'Channel Name',
          ownerId: null
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: [
            'ownerId must be exactly 21 characters long.',
            'Invalid nanoid characters.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('ownerId - undefined', async () => {
        const data = {
          name: 'Channel Name'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: [
            'ownerId must be exactly 21 characters long.',
            'Invalid nanoid characters.'
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

    describe('maxUsers - integer tests', () => {
      it('maxUser - float', async () => {
        const data = {
          name: 'Channel Name',
          ownerId: '564ayPlUh0qtDrePkJ87t',
          maxUsers: 2.564
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: ['maxUsers must be an integer number.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('maxUser - too high', async () => {
        const data = {
          name: 'Channel Name',
          ownerId: '564ayPlUh0qtDrePkJ87t',
          maxUsers: 60
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: ['maxUsers must not be greater than 50.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('maxUser - too low', async () => {
        const data = {
          name: 'Channel Name',
          ownerId: '564ayPlUh0qtDrePkJ87t',
          maxUsers: 0
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: ['maxUsers must not be less than 1.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('maxUser - negative value', async () => {
        const data = {
          name: 'Channel Name',
          ownerId: '564ayPlUh0qtDrePkJ87t',
          maxUsers: -1
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: ['maxUsers must not be less than 1.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('maxUser - Infinity', async () => {
        const data = {
          name: 'Channel Name',
          ownerId: '564ayPlUh0qtDrePkJ87t',
          maxUsers: Infinity
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: [
            'maxUsers must not be greater than 50.',
            'maxUsers must be an integer number.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('maxUser - NaN', async () => {
        const data = {
          name: 'Channel Name',
          ownerId: '564ayPlUh0qtDrePkJ87t',
          maxUsers: NaN
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: [
            'maxUsers must not be greater than 50.',
            'maxUsers must not be less than 1.',
            'maxUsers must be an integer number.'
          ],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('maxUser - wrong type', async () => {
        const data = {
          name: 'Channel Name',
          ownerId: '564ayPlUh0qtDrePkJ87t',
          maxUsers: 'string'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: [
            'maxUsers must not be greater than 50.',
            'maxUsers must not be less than 1.',
            'maxUsers must be an integer number.'
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

    describe('type - EChannelType tests', () => {
      it('type - invalid enum', async () => {
        const data = {
          name: 'Channel Name',
          ownerId: '564ayPlUh0qtDrePkJ87t',
          type: 'Wrong type'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: ['type must be Public or Protected'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('type - invalid type', async () => {
        const data = {
          name: 'Channel Name',
          ownerId: '564ayPlUh0qtDrePkJ87t',
          type: 1
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelInput,
          data: ''
        }
        const res = {
          message: ['type must be Public or Protected'],
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
