import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { InventoryItem } from '../catalog-layer/inventory-item.entity';

@Entity("pipeline_stock")
export class PipelineStock {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => InventoryItem)
  inventoryItem: InventoryItem;

  @ManyToOne(() => Location)
  location: Location;

  @Column("float")
  quantity: number;

  @Column({ type: "timestamp" })
  expectedAt: Date;

  @Column({ default: "IN_TRANSIT" })
  status: string;
}