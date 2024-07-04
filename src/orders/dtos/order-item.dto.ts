import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty({ message: 'El ID del producto es obligatorio' })
  productId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'La cantidad es obligatoria' })
  quantity: number;
}
