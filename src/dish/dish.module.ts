import { Module } from '@nestjs/common';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DishController],
  providers: [DishService, PrismaService]
})
export class DishModule {}
