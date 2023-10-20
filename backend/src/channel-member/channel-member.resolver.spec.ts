import { Test, TestingModule } from '@nestjs/testing'
import { ChannelMemberResolver } from './channel-member.resolver'
import { ChannelMemberService } from './channel-member.service'
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common'
import { CreateChannelMemberCreateInput as CreateChannelMemberInput } from './dto/create-channel-member.input'
import { PrismaService } from '../prisma/prisma.service'
import { ChannelBlockedService } from '../channel-blocked/channel-blocked.service'
import { ChannelInvitedService } from '../channel-invited/channel-invited.service'
import { ChannelModule } from '../channel/channel.module'

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
        ChannelModule,
        PrismaService
      ]
    }).compile()

    resolver = module.get<ChannelMemberResolver>(ChannelMemberResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('Test Error', () => {
    it('invalid avatarUrl - lenght 0', async () => {
      const data = {
        avatarUrl: ''
      }
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: CreateChannelMemberInput,
        data: ''
      }
      const res = {
        message: [''],
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
