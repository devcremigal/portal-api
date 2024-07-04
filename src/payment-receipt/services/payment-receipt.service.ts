import { Injectable } from '@nestjs/common';
import { CreatePaymentReceiptDto } from '../dtos/payment-receipt.dto';
import { UpdatePaymentReceiptDto } from '../dtos/update-payment-receipt.dto';

@Injectable()
export class PaymentReceiptService {
  create(createPaymentReceiptDto: CreatePaymentReceiptDto) {
    return 'This action adds a new paymentReceipt';
  }

  findAll() {
    return `This action returns all paymentReceipt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentReceipt`;
  }

  update(id: number, updatePaymentReceiptDto: UpdatePaymentReceiptDto) {
    return `This action updates a #${id} paymentReceipt`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentReceipt`;
  }
}
