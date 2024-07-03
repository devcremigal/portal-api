import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { PriceTableItem } from './price-table-item.entity';
import { Customer } from 'src/users/entities/customer.entity';

@Entity()
export class PriceTable {
  @PrimaryColumn({ length: 3 })
  code: string;

  @Column({ length: 40 })
  name: string;

  @OneToMany(() => Customer, (customer) => customer.priceTable)
  customers: Customer[];

  @OneToMany(
    () => PriceTableItem,
    (priceTableItem) => priceTableItem.priceTable,
  )
  priceTableItems: PriceTableItem[];
}
