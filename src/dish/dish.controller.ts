import { Controller, Get, Query } from '@nestjs/common';
import { DishService } from './dish.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('dishes-search')
@Controller('dishes')
export class DishController {
    constructor(private dishService: DishService) {}

    @Get('search')
async searchDishes(
  @Query('name') name: string,
  @Query('page') page: number = 1,
  @Query('pageSize') pageSize: number = 2,
) {
  return this.dishService.searchDishesByName(name, page, pageSize);
}
}
