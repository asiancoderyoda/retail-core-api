import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { InventoryItem } from '../catalog-layer/inventory-item.entity';

@Entity("inventory_snapshots")
export class InventorySnapshot {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => InventoryItem)
  inventoryItem: InventoryItem;

  @ManyToOne(() => Location)
  location: Location;

  @Column("float")
  onHand: number;

  @Column("float", { default: 0 })
  reserved: number;

  @Column("float", { default: 0 })
  pipeline: number;

  @Column("float", { default: 0 })
  availableToPromise: number;

  @Column({ type: "timestamp" })
  snapshotTime: Date;
}