import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from 'src/users/users.module';

import { Invoice } from './entities/invoice.entity';
import { PaymentReceipt } from './entities/payment-receipt.entity';
import { PaymentInvoice } from './entities/payment-invoice.entity';
import { PaymentValue } from './entities/payment-value.entity';
import { TypePayment } from './entities/type-payment.entity';

import { InvoicesService } from './services/invoices.service';
import { PaymentReceiptService } from './services/payment-receipt.service';
import { TypePaymentsService } from './services/type-payments.service';

import { InvoicesController } from './controllers/invoices.controller';
import { PaymentReceiptController } from './controllers/payment-receipt.controller';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([
      Invoice,
      PaymentReceipt,
      PaymentInvoice,
      PaymentValue,
      TypePayment,
    ]),
  ],
  controllers: [PaymentReceiptController, InvoicesController],
  providers: [PaymentReceiptService, InvoicesService, TypePaymentsService],
})
export class PaymentReceiptModule {}
