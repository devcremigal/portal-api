import {
  IsNotEmpty,
  ValidateNested,
  ArrayMinSize,
  IsInt,
  IsOptional,
  IsString,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsInt({ message: 'El código del usuario debera ser numerico.' })
  @IsNotEmpty({ message: 'El código del usuario es obligatorio.' })
  userId: number;

  @IsInt({ message: 'El código del cliente debera ser numerico.' })
  @IsNotEmpty({ message: 'El código del cliente es obligatorio.' })
  customerId: number;

  @IsInt({ message: 'El código del direccion de entrega debera ser numerico.' })
  @IsNotEmpty({ message: 'La dirección de entrega es obligatoria.' })
  deliveryAddressId: number;

  @Type(() => Date)
  @IsDate({ message: 'La fecha debe ser una fecha válida.' })
  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  date: Date;

  @Type(() => Date)
  @IsDate({ message: 'La fecha de entrega debe ser una fecha válida.' })
  @IsNotEmpty({ message: 'La fecha de entrega es obligatoria' })
  deliveryDate: Date;

  @IsOptional()
  @IsString()
  obs: string;

  @IsOptional()
  @IsString()
  intObs: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @ArrayMinSize(1, { message: 'La orden debe tener al menos un artículo.' })
  orderItems: CreateOrderItemDto[];
}
