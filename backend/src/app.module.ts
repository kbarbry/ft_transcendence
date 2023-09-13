import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { UserService } from './user/user.service'
import { UserController } from './user/user.controller'
import { UserPresenceService } from './user-presence/user-presence.service'
import { RelationFriendService } from './relation-friend/relation-friend.service'
import { RelationRequestsService } from './relation-requests/relation-requests.service'
import { RelationBlockedService } from './relation-blocked/relation-blocked.service'
import { ChannelService } from './channel/channel.service'
import { ChannelMemberService } from './channel-member/channel-member.service'
import { ChannelMessageService } from './channel-message/channel-message.service'
import { PrivateMessageService } from './private-message/private-message.service'
import { GameStatService } from './game-stat/game-stat.service'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [
    PrismaService,
    AppService,
    UserService,
    UserPresenceService,
    RelationFriendService,
    RelationRequestsService,
    RelationBlockedService,
    ChannelService,
    ChannelMemberService,
    ChannelMessageService,
    PrivateMessageService,
    GameStatService
  ]
})
export class AppModule {}
