import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) {}

    // order.service.ts
        async createOrder(userId: number, createOrderDto: CreateOrderDto) {
            const { paymentMethod, note } = createOrderDto;

            return await this.prisma.$transaction(async (prisma) => {
                // Lấy giỏ hàng của người dùng
                const cart = await prisma.cart.findUnique({
                    where: { userId },
                    include: {
                        cartItems: {
                            include: {
                                dish: {
                                    include: {
                                        restaurant: true, // Lấy thông tin nhà hàng qua món ăn
                                    },
                                },
                            },
                        },
                    },
                });

                if (!cart || cart.cartItems.length === 0) {
                    throw new BadRequestException('Cart is empty.');
                }   

                // Lấy `restaurantId` từ món ăn đầu tiên trong giỏ hàng
                const restaurantId = cart.cartItems[0].dish.restaurantId;

                // Kiểm tra tồn kho cho từng món ăn trong giỏ hàng
                for (const cartItem of cart.cartItems) {
                    const dish = cartItem.dish; // Bây giờ bạn có thể truy cập thông tin món ăn
                    if (!dish) {
                        throw new NotFoundException(`Dish with ID ${cartItem.dishId} not found.`);
                    }
                    if (dish.stock < cartItem.quantity) {
                        throw new BadRequestException(`Not enough stock for dish ${dish.name}.`);
                    }
                }

                // Tính tổng giá
                const totalPrice = cart.cartItems.reduce((acc, item) => {
                    return acc + item.quantity * item.dish.price;
                }, 0);

                // Tạo đơn hàng
                const order = await prisma.order.create({
                    data: {
                        userId,
                        restaurantId,
                        totalPrice,
                        paymentMethod,
                        note,
                        orderItems: {
                            create: cart.cartItems.map(item => ({
                                dishId: item.dishId,
                                quantity: item.quantity,
                                price: item.dish.price,
                            })),
                        },
                    },
                });

                // Trừ tồn kho
                for (const cartItem of cart.cartItems) {
                    await prisma.dish.update({
                        where: { id: cartItem.dishId },
                        data: {
                            stock: {
                                decrement: cartItem.quantity,
                            },
                        },
                    });
                }

                // Xóa giỏ hàng sau khi đặt hàng
                await prisma.cartItem.deleteMany({
                    where: { cartId: cart.id },
                });

                return order;
            });
        }

}
