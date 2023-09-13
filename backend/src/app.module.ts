import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

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
import { UserController } from './user/user.controller'

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
  providers: [AppService]
})
export class AppModule {}
