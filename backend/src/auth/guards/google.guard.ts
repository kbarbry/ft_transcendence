import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    try {
      console.log('Before google GUARD');
      const activate = (await super.canActivate(context)) as boolean;
      console.log('After google GUARD');

      const request = context.switchToHttp().getRequest();
      await super.logIn(request);

      return activate;
    } catch (error) {
      console.error('Error in GoogleAuthGuard', error);
      throw error; // Rethrow the error
    }
  }
}

