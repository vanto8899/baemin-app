import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RestaurantService {
    constructor(private prisma: PrismaService) {}

   // Lấy toàn bộ nhà hàng với phân trang
  async getAllRestaurants(page: number = 1, limit: number = 5) {
    const skip = (page - 1) * limit;
    const [restaurants, totalCount] = await Promise.all([
      this.prisma.restaurant.findMany({
        skip,
        take: limit,
      }),
      this.prisma.restaurant.count(),
    ]);

    return {
      data: restaurants,
      total: totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  // Lấy nhà hàng theo categoryId với phân trang
  async getRestaurantsByCategory(categoryId: number, page: number = 1, limit: number = 2) {
    const skip = (page - 1) * limit;
    const [restaurants, totalCount] = await Promise.all([
      this.prisma.restaurant.findMany({
        where: { categoryId },
        skip,
        take: limit,
      }),
      this.prisma.restaurant.count({
        where: { categoryId },
      }),
    ]);

    return {
      data: restaurants,
      total: totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  // restaurant.service.ts
  async getDishesByRestaurant(restaurantId: number) {
    return this.prisma.dish.findMany({
      where: {
        restaurantId: Number(restaurantId), // Ensure restaurantId is a number
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        imageUrl: true,
      },
    });
  }

}
