import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentInvoiceDto {
  @IsInt({ message: 'El id de factura debera ser numerico.' })
  @IsNotEmpty({ message: 'El id de factura es obligatorio.' })
  invoiceId: number;

  @IsNumber()
  @IsNotEmpty()
  paymentValue: number;
}
