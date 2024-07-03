import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class Seller {
  @PrimaryColumn({ length: 6 })
  code: string;

  @Column({ length: 40 })
  name: string;

  @OneToMany(() => Customer, (customer) => customer.seller)
  customers: Customer[];
}
