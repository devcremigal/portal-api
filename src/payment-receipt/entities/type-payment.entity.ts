import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class TypePayment {
  @PrimaryColumn({ length: 2 })
  code: string;

  @Column({ length: 30 })
  description: string;
}
