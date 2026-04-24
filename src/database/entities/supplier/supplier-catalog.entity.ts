import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Supplier } from './supplier.entity';
import { InventoryItem } from '../catalog-layer/inventory-item.entity';

@Entity("supplier_catalog")
export class SupplierCatalog {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Supplier)
  supplier: Supplier;

  @ManyToOne(() => InventoryItem)
  inventoryItem: InventoryItem;

  @Column("float")
  price: number;

  @Column("int")
  moq: number;

  @Column("int")
  leadTimeDays: number;

  @Column("float")
  maxCapacity: number;
}