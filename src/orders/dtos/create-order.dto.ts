import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsString,
  Length,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @IsInt()
  userId: number;

  @IsDateString()
  date: string;

  @IsString()
  @Length(8, 8)
  time: string;

  @IsInt()
  customerId: number;

  @IsInt()
  deliveryAddId: number;

  @IsDateString()
  deliveryDate: string;

  @IsString()
  @Length(0, 100)
  obs: string;

  @IsString()
  @Length(0, 100)
  intObs: string;

  @IsInt()
  state: number;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @ArrayNotEmpty()
  orderItems: CreateOrderItemDto[];
}
