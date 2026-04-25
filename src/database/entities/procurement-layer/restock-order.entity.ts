import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Organization } from '../tenant-layer/organization.entity';
/*
 * RESTOCK ORDER
 *
 * Represents procurement execution
 */
@Entity("restock_orders")
export class RestockOrder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Organization)
  organization: Organization;

  @Column()
  status: string;

  @Column({ type: "timestamp" })
  orderedAt: Date;
}