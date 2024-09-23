import { Controller, Get, Param, Query } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantController {
    constructor(private restaurantService: RestaurantService) {}

    @Get("/get-all")
    async getAllRestaurants(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 5,
    ) {
      return this.restaurantService.getAllRestaurants(Number(page), Number(limit));
    }

    @Get(':categoryId')
    async getRestaurantsByCategory(
    @Param('categoryId') categoryId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 2,
    ) {
      return this.restaurantService.getRestaurantsByCategory(Number(categoryId), Number(page), Number(limit));
    }

    @Get(':restaurantId/dishes')
    async getDishByRestaurant(@Param('restaurantId') restaurantId: number) {
    return this.restaurantService.getDishesByRestaurant(restaurantId);
    }

}

