import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PriceTableItem } from './price-table-item.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15 })
  code: string;

  @Column({ length: 15 })
  shortCode: string;

  @Column({ length: 15 })
  barCode: string;

  @Column({ length: 30 })
  description: string;

  @Column({ length: 2 })
  unit: string;

  @Column({ length: 2 })
  unit2: string;

  @Column()
  coef: number;

  @Column()
  boxesVal: number;

  @OneToMany(() => PriceTableItem, (priceTableItem) => priceTableItem.product)
  priceTableItems: PriceTableItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
}
