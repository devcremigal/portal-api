import { Controller, Post, Delete, Body, Param } from '@nestjs/common';
import { PaymentReceiptService } from '../services/payment-receipt.service';
import { CreatePaymentReceiptDto } from '../dtos/payment-receipt.dto';

@Controller('payment-receipts')
export class PaymentReceiptController {
  constructor(private readonly paymentReceiptService: PaymentReceiptService) {}

  @Post()
  async create(@Body() createPaymentReceiptDto: CreatePaymentReceiptDto) {
    return this.paymentReceiptService.create(createPaymentReceiptDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.paymentReceiptService.remove(+id);
  }
}
