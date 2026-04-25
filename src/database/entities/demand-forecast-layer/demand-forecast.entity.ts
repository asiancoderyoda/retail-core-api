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
 * Stores predicted demand
 *
 * Enables:
 * - planning
 * - AI input
 *
 * Future:
 * - multiple forecast models
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
  p90: number;

  @Column("float")
  demandStdDev: number;
}