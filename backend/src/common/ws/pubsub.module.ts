import { Global, Module } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'

@Global()
@Module({
  providers: [
    {
      provide: PubSub,
      useFactory: () => {
        return new PubSub()
      }
    }
  ],
  exports: [PubSub]
})
export class PubSubModule {}
