import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Customer } from '../../users/entities/customer.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column({ length: 3 })
  invoiceType: string;

  @Column({ length: 3 })
  invoicePrefix: string;

  @Column({ length: 1 })
  invoiceFee: string;

  @Column({ length: 12 })
  invoiceNumber: string;

  @Column()
  originalValue: number;

  @Column()
  balance: number;
}
