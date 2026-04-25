import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { PlanningItem } from '../catalog-layer/planning-item.entity';
import { Location } from '../tenant-layer/location.entity';
/*
 * INVENTORY SNAPSHOT
 *
 * Current stock state
 *
 * Enables:
 * - real inventory visibility
 */
@Entity("inventory_snapshots")
export class InventorySnapshot {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => PlanningItem)
  planningItem: PlanningItem;

  @ManyToOne(() => Location)
  location: Location;

  @Column("float")
  onHand: number;

  @Column("float", { default: 0 })
  reserved: number;

  @Column({ type: "timestamp" })
  snapshotTime: Date;
}