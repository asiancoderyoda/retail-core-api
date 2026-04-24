import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { InventoryItem } from '../catalog-layer/inventory-item.entity';

@Entity("stock_policy")
export class StockPolicy {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => InventoryItem)
  inventoryItem: InventoryItem;

  @ManyToOne(() => Location)
  location: Location;

  @Column("float")
  safetyStock: number;

  @Column("float")
  serviceLevel: number;

  @Column("float")
  reorderPoint: number;

  @Column("float")
  cycleStock: number;
}