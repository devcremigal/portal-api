import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Customer } from '../../users/entities/customer.entity';
import { Order } from './order.entity';

@Entity()
export class DeliveryAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column({ length: 255 })
  address: string;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  lat: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  long: number;

  @Column({ length: 20 })
  postalCode: string;

  @OneToMany(() => Order, (order) => order.deliveryAddress)
  orders: Order[];
}
