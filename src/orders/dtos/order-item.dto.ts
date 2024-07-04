import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsInt({ message: 'El código del producto debera ser numerico.' })
  @IsNotEmpty({ message: 'El ID del producto es obligatorio' })
  productId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'La cantidad es obligatoria' })
  quantity: number;

  @IsNumber()
  @IsNotEmpty({ message: 'El precio es obligatorio' })
  price: number;

  @IsNumber()
  @IsNotEmpty({ message: 'El total es obligatorio' })
  total: number;
}
