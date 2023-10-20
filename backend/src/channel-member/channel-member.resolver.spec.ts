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
