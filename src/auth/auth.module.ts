import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
//import { AuthGuard } from './auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "secretKey",  
      signOptions: { expiresIn: '2h' }, 
    }),
  ],
  controllers: [AuthController], 
  providers: [AuthService, PrismaService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
