import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentReceiptService } from '../services/payment-receipt.service';
import { CreatePaymentReceiptDto } from '../dtos/create-payment-receipt.dto';
import { UpdatePaymentReceiptDto } from '../dtos/update-payment-receipt.dto';

@Controller('payment-receipt')
export class PaymentReceiptController {
  constructor(private readonly paymentReceiptService: PaymentReceiptService) {}

  @Post()
  create(@Body() createPaymentReceiptDto: CreatePaymentReceiptDto) {
    return this.paymentReceiptService.create(createPaymentReceiptDto);
  }

  @Get()
  findAll() {
    return this.paymentReceiptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentReceiptService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentReceiptDto: UpdatePaymentReceiptDto,
  ) {
    return this.paymentReceiptService.update(+id, updatePaymentReceiptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentReceiptService.remove(+id);
  }
}
