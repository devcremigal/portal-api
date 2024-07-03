import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PaymentReceipt } from './payment-receipt.entity';
import { Invoice } from './invoice.entity';

@Entity()
export class PaymentInvoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => PaymentReceipt,
    (paymentReceipt) => paymentReceipt.paymentInvoices,
  )
  @JoinColumn({ name: 'paymentReceiptId' })
  paymentReceipt: PaymentReceipt;

  @ManyToOne(() => Invoice, (invoice) => invoice.id)
  @JoinColumn({ name: 'invoiceId' })
  invoice: Invoice;

  @Column()
  paymentValue: number;
}
