import { IsInt, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsInt()
  productId: number;

  @IsNumber()
  qty: number;

  @IsNumber()
  price: number;

  @IsNumber()
  total: number;
}
