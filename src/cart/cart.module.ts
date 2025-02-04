import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService]
})
export class CartModule {}
