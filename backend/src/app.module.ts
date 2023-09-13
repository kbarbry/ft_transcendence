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
import { PrismaModule } from './prisma/prisma.module'
import { ChannelModule } from './channel/channel.module'
import { ChannelMemberModule } from './channel-member/channel-member.module'
import { ChannelMessageModule } from './channel-message/channel-message.module'
import { GameStatModule } from './game-stat/game-stat.module'
import { PrivateMessageModule } from './private-message/private-message.module'
import { RelationBlockedModule } from './relation-blocked/relation-blocked.module'
import { RelationFriendModule } from './relation-friend/relation-friend.module'
import { RelationRequestsModule } from './relation-requests/relation-requests.module'
import { UserModule } from './user/user.module'
import { UserPresenceModule } from './user-presence/user-presence.module'

@Module({
  imports: [
    PrismaModule,
    ChannelModule,
    ChannelMemberModule,
    ChannelMessageModule,
    GameStatModule,
    PrivateMessageModule,
    RelationBlockedModule,
    RelationFriendModule,
    RelationRequestsModule,
    UserModule,
    UserPresenceModule
  ],
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
