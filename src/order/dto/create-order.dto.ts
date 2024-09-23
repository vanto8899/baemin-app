import { ApiProperty } from "@nestjs/swagger";
import { PaymentMethod } from "@prisma/client";

export class CreateOrderDto {
    @ApiProperty()
    restaurantId: number;

    @ApiProperty()
    cartItems: {
      dishId: number;
      quantity: number;
      price: number;
    }[];

    @ApiProperty()
    paymentMethod: PaymentMethod;

    @ApiProperty()
    note?: string;
  }