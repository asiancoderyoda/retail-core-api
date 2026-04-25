import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { PlanningItem } from '../catalog-layer/planning-item.entity';
import { Location } from '../tenant-layer/location.entity';

/*
 * DEMAND SUPPLY PLAN SNAPSHOT
 *
 * Final deterministic planning context assembled for AI.
 */
@Entity("demand_supply_plan_snapshots")
export class DemandSupplyPlanSnapshot {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => PlanningItem)
  planningItem: PlanningItem;

  @ManyToOne(() => Location)
  location: Location;

  @Column("float")
  availableInventoryPosition: number;

  @Column("float")
  forecastDemand: number;

  @Column("float")
  safetyStock: number;

  @Column("float")
  reorderPoint: number;

  @Column("float")
  shortageGap: number;

  @CreateDateColumn()
  createdAt: Date;
}