import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { PlanningItem } from '../catalog-layer/planning-item.entity';
import { Location } from '../tenant-layer/location.entity';

/*
 * STOCK POLICY
 *
 * Deterministic stock planning policy configuration.
 */
@Entity("stock_policies")
export class StockPolicy {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => PlanningItem)
  planningItem: PlanningItem;

  @ManyToOne(() => Location)
  location: Location;

  @Column("float")
  serviceLevel: number;

  @Column("float")
  reviewPeriodDays: number;

  @Column("float")
  leadTimeStdDev: number;

  @Column({ default: true })
  autoCompute: boolean;
}