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
 * INVENTORY RESERVATION
 *
 * Stock blocked/reserved.
 */
@Entity("inventory_reservations")
export class InventoryReservation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => PlanningItem)
  planningItem: PlanningItem;

  @ManyToOne(() => Location)
  location: Location;

  @Column("float")
  reservedQty: number;

  @Column()
  reason: string;

  @CreateDateColumn()
  createdAt: Date;
}