import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) {}

// cart.controller.ts
@Post('add')
@UseGuards(JwtAuthGuard)
    async addToCart(
    @Body() addCartItemDto: AddCartItemDto,
    @Req() req: any,
    ) {
    if (!req.user || !req.user.id) {
        throw new Error('User not authenticated');
    }
    const userId = req.user.id; // Assume you have authentication middleware to attach user
    return this.cartService.addToCart(userId, addCartItemDto);
    }
}
