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
import { DeliveryAddress } from './delivery-address.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'date' })
  date: Date;

  @Column({ length: 8 })
  time: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @ManyToOne(() => DeliveryAddress, (deliveryAddress) => deliveryAddress.orders)
  @JoinColumn({ name: 'deliveryAddressId' })
  deliveryAddress: DeliveryAddress;

  @Column({ type: 'date' })
  deliveryDate: Date;

  @Column({ length: 100 })
  obs: string;

  @Column({ length: 100 })
  intObs: string;

  @Column()
  state: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
