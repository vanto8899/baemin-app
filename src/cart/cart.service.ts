import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) {}

    // cart.service.ts
    async addToCart(userId: number, addCartItemDto: AddCartItemDto) {
      const { dishId, quantity } = addCartItemDto;

      return await this.prisma.$transaction(async (prisma) => {
          // Tìm giỏ hàng của người dùng dựa trên userId
          let cart = await prisma.cart.findUnique({
              where: { userId },
          });

          // Nếu giỏ hàng chưa tồn tại, tạo mới giỏ hàng cho người dùng
          if (!cart) {
              cart = await prisma.cart.create({
                  data: { userId },
              });
          }

          // Tìm món ăn trong giỏ hàng dựa trên cartId và dishId
          const existingCartItem = await prisma.cartItem.findFirst({
              where: {
                  cartId: cart.id,
                  dishId,
              },
          });

          // Nếu món ăn đã tồn tại, cập nhật số lượng
          if (existingCartItem) {
              return prisma.cartItem.update({
                  where: { id: existingCartItem.id },
                  data: { quantity: existingCartItem.quantity + quantity },
              });
          } else {
              // Nếu món ăn chưa có, thêm món ăn vào giỏ hàng
              return prisma.cartItem.create({
                  data: {
                      cartId: cart.id,
                      dishId,
                      quantity,
                  },
              });
          }
      });
    }

}
