import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { PlanningItem } from '../catalog-layer/planning-item.entity';
import { Location } from '../tenant-layer/location.entity';

/*
 * DEMAND FORECAST
 *
 * Forecasted planning item demand.
 *
 * * Enables:
 * - planning
 * - AI input
 *
 * Future:
 * - multiple forecast models
 * 
 * Supports:
 * - volatility
 * - seasonality
 * - planner overrides later
 */
@Entity("demand_forecasts")
export class DemandForecast {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => PlanningItem)
  planningItem: PlanningItem;

  @ManyToOne(() => Location)
  location: Location;

  @Column({ type: "date" })
  forecastDate: string;

  @Column("float")
  avgDailyDemand: number;

  @Column("float")
  p50: number;

  @Column("float")
  p90: number;

  @Column("float")
  demandStdDev: number;

  @Column("float", { default: 1 })
  seasonalityIndex: number;

  @Column({ nullable: true })
  manualOverrideReason: string;
}