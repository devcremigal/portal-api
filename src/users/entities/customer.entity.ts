import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Seller } from './seller.entity';
import { PriceTable } from '../../orders/entities/price-table.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 6 })
  code: string;

  @Column({ length: 2 })
  branch: string;

  @Column({ length: 50 })
  name: string;

  @ManyToOne(() => Seller, (seller) => seller.customers)
  @JoinColumn({ name: 'sellerCode' })
  seller: Seller;

  @ManyToOne(() => PriceTable, (PriceTable) => PriceTable.customers)
  @JoinColumn({ name: 'priceTableCode' })
  priceTable: PriceTable;

  @Column()
  blocked: boolean;
}
