import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInvoiceDto {
  @IsNotEmpty()
  @IsString()
  readonly customerId: string;

  @IsNotEmpty()
  @IsString()
  readonly invoiceType: string;

  @IsNotEmpty()
  @IsString()
  readonly invoicePrefix: string;

  @IsNotEmpty()
  @IsString()
  readonly invoiceFee: string;

  @IsNotEmpty()
  @IsString()
  readonly invoiceNumber: string;

  @IsNotEmpty()
  @IsNumber()
  readonly originalValue: number;

  @IsNotEmpty()
  @IsNumber()
  readonly balance: number;
}

export class UpdateInvoiceDto extends CreateInvoiceDto {}
