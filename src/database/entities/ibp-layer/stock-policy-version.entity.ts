import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { StockPolicy } from './stock-policy.entity';

/*
 * STOCK POLICY VERSION
 *
 * Versioned deterministic outputs.
 */
@Entity("stock_policy_versions")
export class StockPolicyVersion {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => StockPolicy)
  stockPolicy: StockPolicy;

  @Column("float")
  safetyStock: number;

  @Column("float")
  cycleStock: number;

  @Column("float")
  reorderPoint: number;

  @Column("float")
  targetStock: number;

  @CreateDateColumn()
  createdAt: Date;
}