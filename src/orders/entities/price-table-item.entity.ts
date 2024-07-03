import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { PriceTable } from './price-table.entity';
import { Product } from './product.entity';

@Entity()
export class PriceTableItem {
  @PrimaryColumn({ length: 3 })
  priceTableCode: string;

  @PrimaryColumn()
  productId: number;

  @ManyToOne(() => PriceTable, (priceTable) => priceTable.priceTableItems)
  @JoinColumn({ name: 'priceTableCode' }) // Relación con la entidad PriceTable
  priceTable: PriceTable;

  @ManyToOne(() => Product, (product) => product.priceTableItems)
  @JoinColumn({ name: 'productId' }) // Relación con la entidad PriceTable
  product: Product;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
