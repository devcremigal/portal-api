import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsString,
  Length,
  ValidateNested,
  IsOptional,
  ArrayNotEmpty,
  IsNotEmpty,
} from 'class-validator';
import { CreatePaymentInvoiceDto } from './payment-invoice.dto';
import { CreatePaymentValueDto } from './payment-value.dto';

export class CreatePaymentReceiptDto {
  @IsInt({ message: 'El código de usuario debera ser numerico.' })
  userId: number;

  @Type(() => Date)
  @IsDate({ message: 'La fecha debe ser una fecha válida.' })
  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  date: Date;

  @IsString()
  @Length(8, 8)
  time: string;

  @IsInt({ message: 'El código del cliente debera ser numerico.' })
  @IsNotEmpty({ message: 'El código del cliente es obligatorio.' })
  customerId: number;

  @IsInt()
  state: number;

  @IsString()
  @Length(0, 100)
  obs: string;

  @ValidateNested({ each: true })
  @Type(() => CreatePaymentInvoiceDto)
  @IsOptional()
  paymentInvoices?: CreatePaymentInvoiceDto[];

  @ValidateNested({ each: true })
  @Type(() => CreatePaymentValueDto)
  @ArrayNotEmpty({ message: 'No se informo ninguna forma de pago.' })
  paymentValues: CreatePaymentValueDto[];
}
