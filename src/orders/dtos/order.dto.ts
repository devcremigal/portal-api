import {
  IsNotEmpty,
  IsDateString,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'El código del cliente es obligatorio' })
  customerId: number;

  @IsNotEmpty({ message: 'La dirección de entrega es obligatoria' })
  deliveryAddressId: number;

  @IsDateString({}, { message: 'La fecha debe ser una fecha válida' })
  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  date: Date;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @ArrayMinSize(1, { message: 'La orden debe tener al menos un artículo' })
  orderItems: CreateOrderItemDto[];
}
