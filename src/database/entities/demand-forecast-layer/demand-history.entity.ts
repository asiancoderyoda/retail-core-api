import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { PlanningItem } from '../catalog-layer/planning-item.entity';
import { Location } from '../tenant-layer/location.entity';

/*
 * DEMAND HISTORY
 *
 * Daily aggregated demand per planning item
 *
 * Source:
 * - direct sales OR BOM explosion
 *
 * Enables:
 * - forecasting
 */
@Entity("demand_history")
export class DemandHistory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => PlanningItem)
  planningItem: PlanningItem;

  @ManyToOne(() => Location)
  location: Location;

  @Column({ type: "date" })
  bucketDate: string;

  @Column("float")
  unitsConsumed: number;
}