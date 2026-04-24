import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { InventoryItem } from '../catalog-layer/inventory-item.entity';
import { Supplier } from './supplier.entity';

@Entity("supplier_allocations")
export class SupplierAllocation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => InventoryItem)
  inventoryItem: InventoryItem;

  @ManyToOne(() => Supplier)
  supplier: Supplier;

  @Column("float")
  allocationPct: number; // 0.7 = 70%

  @Column({ default: 1 })
  priority: number;
}