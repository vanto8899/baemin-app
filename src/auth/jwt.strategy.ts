import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'secretKey',
    });
  }

  // Validate and authenticate the user
  async validate(payload: any) {
    const { sub, username, phone, email } = payload;

    // Ensure at least one valid identifier is provided
    if (!username && !phone && !email) {
      throw new UnauthorizedException('Invalid token payload');
    }

    // Try to find the user by username, phone, or email
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          username ? { username: username } : undefined,
          phone ? { phone: phone } : undefined,
          email ? { email: email } : undefined,
        ].filter(Boolean), // Filter out undefined values
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Return the user data that will be attached to req.user
    return { id: user.id, username: user.username, phone: user.phone, email: user.email };
  }
}
