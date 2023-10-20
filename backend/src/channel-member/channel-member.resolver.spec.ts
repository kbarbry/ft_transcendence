import { Test, TestingModule } from '@nestjs/testing'
import { ChannelMemberResolver } from './channel-member.resolver'
import { ChannelMemberService } from './channel-member.service'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'
import { CreateChannelMemberCreateInput as CreateChannelMemberInput } from './dto/create-channel-member.input'
import { PrismaService } from '../prisma/prisma.service'
import { ChannelBlockedService } from '../channel-blocked/channel-blocked.service'
import { ChannelInvitedService } from '../channel-invited/channel-invited.service'
import { ChannelService } from '../channel/channel.service'

describe('ChannelMemberResolver', () => {
  let resolver: ChannelMemberResolver
  const validationPipe = new ValidationPipe()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelMemberResolver,
        ChannelMemberService,
        ChannelBlockedService,
        ChannelInvitedService,
        ChannelService,
        PrismaService
      ]
    }).compile()

    resolver = module.get<ChannelMemberResolver>(ChannelMemberResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('Validation Pipe Good', () => {
    it('Good data', async () => {
      const data = {
        avatarUrl: 'http://www.pic.com/pic.png',
        nickname: 'Bobby',
        userId: '765ayPlUh0qtDrePkJ87t',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: CreateChannelMemberInput,
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
        metatype: CreateChannelMemberInput,
        data: ''
      }
      const res = {
        message: [
          'nickname must be between 1 and 30 characters long.',
          'nickname must be a string.',
          'userId must be exactly 21 characters long.',
          'Invalid nanoid characters.',
          'channelId must be exactly 21 characters long.',
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

    it('Bad avatar url - no http', async () => {
      const data = {
        avatarUrl: '//www.pic.com/pic.png',
        nickname: 'Bobby',
        userId: '765ayPlUh0qtDrePkJ87t',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: CreateChannelMemberInput,
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

    it('Bad avatar url - bad format', async () => {
      const data = {
        avatarUrl: 'http://pic/pic.png',
        nickname: 'Bobby',
        userId: '765ayPlUh0qtDrePkJ87t',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: CreateChannelMemberInput,
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

    it('Bad avatar url - too long', async () => {
      const data = {
        avatarUrl:
          'http://www.reallylong.link/rll/YpqBs8onVu3lurGvSr92X6ynlxX9Evl5pgzbmNhJ62l8S0cl2qPQlGm/Q3SoXwxoisIuLhvqaLmXt4kk8HffFs429uyBsafy0/sWNcXKprl95h/Q_x1/aUJpdSeogSXiwZE/DBhv7G2Y1VuwuErF55iY7PFf9qnHaiux3SZtHPSEgR59pHRV967Fm17hxN_NMvNqdXwqBMJlesZCwXQgZO6aiV4vG3mQqmM2v0BbtEJOSLGr04Xbx7ZdWf8wohlYwezd4EQIYTfoQjzh5DuGxiM43O7lmDX_ELdENXXk12hR4tqX1Q4GjMpNM0YGvDje/grvxlmDihsPN0h6vcnEWnNWbQT1kiQ918yz/t6X2CU7syhcof9TwjFIVie_QTIuVd4x786Vl2QJjf0vN2cGasDgp4RdyrPgz/5NmH20HxnE0H4dh7RWks_Fy56leMPWUUmXueHpUJ9FKCjr5NhEARYmiFrs_QN7gk_GqbVXwF8B5ZpWu1JQ81Ima8Zxv1h0kcE0rcZCrCQvAx4MG7UblFzzQeus8_tgtBgRvZ79h/hJApFZgETR5XdOZSFofOO_MXa46RQO42Q5YiPkefDIakAZ4rrvJDcs/JvjI_Cg47TGwVNiXiAOA/YGmn932_GEVecNFkLjhme28JekOXZLeWDanNVvDoViNQl2y20li_Z8uZO9F5TwbQYfK/wN_WvOOFV9abv1sybjX/P/xDahBLKJZMbPvMQzpYaJwW_f_AaGDxzTBhUgPWGuWh37GheNlhMnqkWYhS/EjBmP6QqXF7IK9ohO5TEM0sQlq/bNj2Yrmgzzelh9i6ar56WREzi2tE9/6zcR_W5zJszrXBKbGpqy9D67rbROYciD6oiYg2JgLf8QuJqJhjZHghDJd51D5MP7l5Bjdcpzmg3tBzNJZ4fIbbN4DocszjEDltifxpm3kR4bTG3v3TrbpyLAi0/7BPb9jixZscybLBcLgDmbwSUdbZxWGpEFdjAz/wIB_BHuY5JENJqZHD/zOtItWUI4XAgUugA_Xr8GyLBg9c_pfiNvsj0Lb7dKMDcfc3F9EMnhax1Az66/2XoqweE0DwM0MGNRqS9ddeQZTUoS13hOmX8k1QGhv48mdWuq1KHrwRJ4ozHGuZ_L0mOmPYynlBBIbWlwsKftbHhh/I11wlBNCxecs5eBhjxOUYi4QS7XpdlCtcZndLE8yq9Ve8DithvHtUmrbek_MCMnes9zG3rbwZorEL9S0_rDj_i0agvHq9/g2vuhef4CFgxTUNFM92sI5oPtRr7HDARyJjwXKYgWJ7m3hNtNcL5IzuN5euhDoI2LF8JItgeJvMms3UQQIAAKDOnjU4JjdQBXM2tFTN4BNH3/7YriTceppAuqp9vD/UOhMDZckHSFZMF3DuSxHN7p4v/OhAyrCuUhqtbROCebK/HXyEndhMqJoQicfUCXfX_9jkQc5eEiK2Ij4jAW4GhXYJftQjVPYtP7PiJTxVC3Mg7GTXwfZhnEoBAFG2H3vHrCkUaTta5/n1wckR_OppIt/ApgKZHGPQCj8OCqfAwQZwHq6XEVkh0RfCfmA_gJoanILoveYou0xy5c57hs9WSOx9T_fSE9pbBI7ZQL58I7yFRAf4WDnuUpY8nK8h2Wgp4a6iUZQZ0_AIuppPZfXj7p_EWKaiBshejslaXVPRnr4X8O6P4qwu_R_vVp0CVlFhPCCTRf0UHSp7gpjfeLcBpkghKnEOKk3cF0KFlcRZPxCAdDIns_l5e10OQLwEKuaYYa4HPaBNEFHbG3TnIlia7jTE2IZgSY/OV0uTc9t5xkO1d8/VDdldGVEC8C31kpwlft6odsilh/BOfsj7/YWP5Jq5wfwfsScnDrA1F6l_M1yoH9lICMLVrIDuvVzFmbBfIzEv5UFlR_skhmv5AA3Ix7Qr5K6jQ_k0qUtl5DI6TyODeoz5liYvIA_G74Hg1wsoKlq_veryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyylongURLyeahIknow',
        nickname: 'Bobby',
        userId: '765ayPlUh0qtDrePkJ87t',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: CreateChannelMemberInput,
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

    it('Bad nickname - undefined', async () => {
      const data = {
        userId: '765ayPlUh0qtDrePkJ87t',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: CreateChannelMemberInput,
        data: ''
      }
      const res = {
        message: [
          'nickname must be between 1 and 30 characters long.',
          'nickname must be a string.'
        ],
        error: 'Bad Request',
        statusCode: 400
      }
      const thrownError = await validationPipe
        .transform(data, metadata)
        .catch((error) => error)
      expect(thrownError.getResponse()).toStrictEqual(res)
    })

    it('Bad nickname - wrong type', async () => {
      const data = {
        nickname: 12,
        userId: '765ayPlUh0qtDrePkJ87t',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: CreateChannelMemberInput,
        data: ''
      }
      const res = {
        message: [
          'nickname must be between 1 and 30 characters long.',
          'nickname must be a string.'
        ],
        error: 'Bad Request',
        statusCode: 400
      }
      const thrownError = await validationPipe
        .transform(data, metadata)
        .catch((error) => error)
      expect(thrownError.getResponse()).toStrictEqual(res)
    })

    it('Bad nickname - too long', async () => {
      const data = {
        nickname: 'Really      too     long       nickname',
        userId: '765ayPlUh0qtDrePkJ87t',
        channelId: 'pihayPlUh0qtDrePkJ87t'
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: CreateChannelMemberInput,
        data: ''
      }
      const res = {
        message: ['nickname must be between 1 and 30 characters long.'],
        error: 'Bad Request',
        statusCode: 400
      }
      const thrownError = await validationPipe
        .transform(data, metadata)
        .catch((error) => error)
      expect(thrownError.getResponse()).toStrictEqual(res)
    })

    describe('Bad UserId', () => {
      it('Bad UserId - bad characters', async () => {
        const data = {
          avatarUrl: 'http://www.pic.com/pic.png',
          nickname: 'Bobby',
          userId: '765ayPlUh0qtDrePkJ87;',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMemberInput,
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

      it('Bad UserId - too short', async () => {
        const data = {
          avatarUrl: 'http://www.pic.com/pic.png',
          nickname: 'Bobby',
          userId: '765ayPlUh0qtDrePkJ87',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMemberInput,
          data: ''
        }
        const res = {
          message: ['userId must be exactly 21 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('Bad UserId - too long', async () => {
        const data = {
          avatarUrl: 'http://www.pic.com/pic.png',
          nickname: 'Bobby',
          userId: '765ayPlUh0qtDrePkJ87tt',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMemberInput,
          data: ''
        }
        const res = {
          message: ['userId must be exactly 21 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('Bad UserId - wrong type', async () => {
        const data = {
          avatarUrl: 'http://www.pic.com/pic.png',
          nickname: 'Bobby',
          userId: 75,
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMemberInput,
          data: ''
        }
        const res = {
          message: [
            'userId must be exactly 21 characters long.',
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

      it('Bad UserId - undefined', async () => {
        const data = {
          avatarUrl: 'http://www.pic.com/pic.png',
          nickname: 'Bobby',
          channelId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMemberInput,
          data: ''
        }
        const res = {
          message: [
            'userId must be exactly 21 characters long.',
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

    describe('Bad ChannelId', () => {
      it('Bad ChannelId - bad characters', async () => {
        const data = {
          avatarUrl: 'http://www.pic.com/pic.png',
          nickname: 'Bobby',
          userId: 'pihayPlUh0qtDrePkJ87t',
          channelId: '765ayPlUh0qtDrePkJ87;'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMemberInput,
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

      it('Bad ChannelId - too short', async () => {
        const data = {
          avatarUrl: 'http://www.pic.com/pic.png',
          nickname: 'Bobby',
          userId: 'pihayPlUh0qtDrePkJ87t',
          channelId: '765ayPlUh0qtDrePkJ87'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMemberInput,
          data: ''
        }
        const res = {
          message: ['channelId must be exactly 21 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('Bad ChannelId - too long', async () => {
        const data = {
          avatarUrl: 'http://www.pic.com/pic.png',
          nickname: 'Bobby',
          userId: 'pihayPlUh0qtDrePkJ87t',
          channelId: '765ayPlUh0qtDrePkJ87tt'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMemberInput,
          data: ''
        }
        const res = {
          message: ['channelId must be exactly 21 characters long.'],
          error: 'Bad Request',
          statusCode: 400
        }
        const thrownError = await validationPipe
          .transform(data, metadata)
          .catch((error) => error)
        expect(thrownError.getResponse()).toStrictEqual(res)
      })

      it('Bad ChannelId - wrong type', async () => {
        const data = {
          avatarUrl: 'http://www.pic.com/pic.png',
          nickname: 'Bobby',
          userId: 'pihayPlUh0qtDrePkJ87t',
          channelId: 75
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMemberInput,
          data: ''
        }
        const res = {
          message: [
            'channelId must be exactly 21 characters long.',
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

      it('Bad ChannelId - undefined', async () => {
        const data = {
          avatarUrl: 'http://www.pic.com/pic.png',
          nickname: 'Bobby',
          userId: 'pihayPlUh0qtDrePkJ87t'
        }
        const metadata: ArgumentMetadata = {
          type: 'body',
          metatype: CreateChannelMemberInput,
          data: ''
        }
        const res = {
          message: [
            'channelId must be exactly 21 characters long.',
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
  })
})
