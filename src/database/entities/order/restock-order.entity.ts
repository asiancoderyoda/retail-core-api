import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Supplier } from '../supplier/supplier.entity';

@Entity("restock_orders")
export class RestockOrder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Supplier)
  supplier: Supplier;

  @ManyToOne(() => Location)
  location: Location;

  @Column()
  status: string;

  @Column({ type: "timestamp" })
  orderedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  expectedAt: Date;
}