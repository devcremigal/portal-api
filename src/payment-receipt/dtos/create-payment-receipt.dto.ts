import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsString,
  Length,
  ValidateNested,
  IsOptional,
  ArrayNotEmpty,
} from 'class-validator';
import { CreatePaymentInvoiceDto } from './create-payment-invoice.dto';
import { CreatePaymentValueDto } from './create-payment-value.dto';

export class CreatePaymentReceiptDto {
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
  state: number;

  @IsString()
  @Length(0, 100)
  obs: string;

  @ValidateNested({ each: true })
  @Type(() => CreatePaymentInvoiceDto)
  @IsOptional()
  paymentInvoice?: CreatePaymentInvoiceDto;

  @ValidateNested({ each: true })
  @Type(() => CreatePaymentValueDto)
  @ArrayNotEmpty()
  paymentValues: CreatePaymentValueDto[];
}
