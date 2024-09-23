import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        //const request = context.switchToHttp().getRequest();
        //console.log(request.user); // Log the user object to check if it's being attached
        return super.canActivate(context); // Calls the strategy to validate the token
      }
}
