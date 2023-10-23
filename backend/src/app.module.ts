import { Module } from '@nestjs/common'
import { AppService } from './app.service'

import { PrismaModule } from './prisma/prisma.module'
import { ChannelModule } from './channel/channel.module'
import { ChannelBlockedModule } from './channel-blocked/channel-blocked.module'
import { ChannelInvitedModule } from './channel-invited/channel-invited.module'
import { ChannelMemberModule } from './channel-member/channel-member.module'
import { ChannelMessageModule } from './channel-message/channel-message.module'
import { GameStatModule } from './game-stat/game-stat.module'
import { PrivateMessageModule } from './private-message/private-message.module'
import { RelationBlockedModule } from './relation-blocked/relation-blocked.module'
import { RelationFriendModule } from './relation-friend/relation-friend.module'
import { RelationRequestsModule } from './relation-requests/relation-requests.module'
import { UserModule } from './user/user.module'
import { UserPresenceModule } from './user-presence/user-presence.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { APP_FILTER } from '@nestjs/core'
import { GlobalExceptionFilter } from './common/filters/prisma-exception.filter'

@Module({
  imports: [
    PrismaModule,
    ChannelModule,
    ChannelBlockedModule,
    ChannelInvitedModule,
    ChannelMemberModule,
    ChannelMessageModule,
    GameStatModule,
    PrivateMessageModule,
    RelationBlockedModule,
    RelationFriendModule,
    RelationRequestsModule,
    UserModule,
    UserPresenceModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      includeStacktraceInErrorResponses: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    })
  ],
  controllers: [],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: GlobalExceptionFilter }
  ]
})
export class AppModule {}
