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
 * INVENTORY ADJUSTMENTS
 *
 * Spoilage, wastage, manual corrections.
 */
@Entity("inventory_adjustments")
export class InventoryAdjustment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => PlanningItem)
  planningItem: PlanningItem;

  @ManyToOne(() => Location)
  location: Location;

  @Column("float")
  deltaQty: number;

  @Column()
  reason: string;

  @Column()
  actorExternalUserId: string;

  @CreateDateColumn()
  createdAt: Date;
}