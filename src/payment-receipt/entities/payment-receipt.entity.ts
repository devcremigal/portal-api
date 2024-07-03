import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Customer } from '../../users/entities/customer.entity';
import { PaymentInvoice } from './payment-invoice.entity';
import { PaymentValue } from './payment-value.entity';

@Entity()
export class PaymentReceipt {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  date: Date;

  @Column({ length: 8 })
  time: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column()
  state: number;

  @Column({ length: 100 })
  obs: string;

  @OneToMany(
    () => PaymentInvoice,
    (paymentInvoice) => paymentInvoice.paymentReceipt,
  )
  paymentInvoices: PaymentInvoice[];

  @OneToMany(() => PaymentValue, (paymentValue) => paymentValue.paymentReceipt)
  paymentValues: PaymentValue[];
}
