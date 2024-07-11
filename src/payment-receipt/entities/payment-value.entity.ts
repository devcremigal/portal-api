import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PaymentReceipt } from './payment-receipt.entity';
import { TypePayment } from './type-payment.entity';

@Entity()
export class PaymentValue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => PaymentReceipt,
    (paymentReceipt) => paymentReceipt.paymentValues,
  )
  @JoinColumn({ name: 'paymentReceiptId' })
  paymentReceipt: PaymentReceipt;

  @ManyToOne(() => TypePayment)
  @JoinColumn({ name: 'typePaymentCode' })
  typePayment: TypePayment;

  @Column({ length: 12 })
  number: string;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  value: number;

  @Column({ type: 'date' })
  createDate: Date;

  @Column({ type: 'date' })
  expirationDate: Date;

  @Column({ length: 3 })
  bankCode: string;

  @Column({ length: 5 })
  bankBranch: string;

  @Column({ length: 10 })
  bankAccount: string;

  @Column({ length: 31 })
  chkScan: string;

  @Column({ length: 3 })
  chkBank: string;

  @Column({ length: 5 })
  chkBranch: string;

  @Column({ length: 10 })
  chkAccount: string;

  @Column({ type: 'bigint', nullable: true })
  chkIdCuit?: number;

  @Column({ type: 'bigint', nullable: true })
  chkIdDNI?: number;

  @Column({ length: 100 })
  obs: string;
}
