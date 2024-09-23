import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
    constructor(private orderService: OrderService) {}

    // order.controller.ts
    @Post('create')
    async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: any,
    ) {
        if (!req.user || !req.user.id) {
            throw new Error('User not authenticated');
        }
    const userId = req.user.id; // Assume user authentication is handled
    return this.orderService.createOrder(userId, createOrderDto);
    }
}
