import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { InventoryItem } from '../catalog-layer/inventory-item.entity';

@Entity("supply_plans")
export class SupplyPlan {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => InventoryItem)
  inventoryItem: InventoryItem;

  @ManyToOne(() => Location)
  location: Location;

  @Column({ type: "date" })
  bucketDate: string;

  @Column("float")
  plannedOrderQty: number;

  @Column("float")
  coverageDays: number;
}