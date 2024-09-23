import { ApiProperty } from "@nestjs/swagger";

export class AddCartItemDto {
    @ApiProperty()
    dishId: number;
    
    @ApiProperty()
    quantity: number;
  }