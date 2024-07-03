import { IsInt, IsNumber } from 'class-validator';

export class CreatePaymentInvoiceDto {
  @IsInt()
  invoiceId: number;

  @IsNumber()
  paymentValue: number;
}
