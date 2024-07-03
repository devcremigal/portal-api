import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentReceiptService } from './services/payment-receipt.service';
import { PaymentReceiptController } from './controllers/payment-receipt.controller';
import { Invoice } from './entities/invoice.entity';
import { PaymentReceipt } from './entities/payment-receipt.entity';
import { PaymentInvoice } from './entities/payment-invoice.entity';
import { PaymentValue } from './entities/payment-value.entity';
import { TypePayment } from './entities/type-payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Invoice,
      PaymentReceipt,
      PaymentInvoice,
      PaymentValue,
      TypePayment,
    ]),
  ],
  controllers: [PaymentReceiptController],
  providers: [PaymentReceiptService],
})
export class PaymentReceiptModule {}
