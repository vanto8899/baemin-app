import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DishService {
    constructor(private prisma: PrismaService) {}

    // dish.service.ts
    async searchDishesByName(name: string, page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;
    
        const dishes = await this.prisma.dish.findMany({
        where: {
            name: {
            contains: name,
            mode: 'insensitive',
            },
        },
        skip: skip,
        take: pageSize,  // Corrected this line to use a number, not a string
        select: {
            id: true,
            name: true,
            restaurant: {
            select: {
                id: true,
                name: true,
                address: true,
            },
            },
        },
        });
    
        const totalDishes = await this.prisma.dish.count({
        where: {
            name: {
            contains: name,
            mode: 'insensitive',
            },
        },
        });
    
        return {
        dishes,
        totalPages: Math.ceil(totalDishes / pageSize),
        currentPage: page,
        };
    }
  
}
