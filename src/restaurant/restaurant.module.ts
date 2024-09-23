import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantService, PrismaService]
})
export class RestaurantModule {}
