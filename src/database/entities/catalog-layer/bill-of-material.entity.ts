import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Product } from './product.entity';
import { InventoryItem } from './inventory-item.entity';

@Entity("bill_of_materials")
export class BillOfMaterial {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => InventoryItem)
  inventoryItem: InventoryItem;

  @Column("float")
  quantityRequired: number;

  @Column()
  unitOfMeasure: string;

  @Column({ default: 0 })
  yieldLossPct: number;

  @Column({ default: false })
  substitutable: boolean;

  @Column({ default: 1 })
  priority: number;

  @Column({ type: "timestamp", nullable: true })
  validFrom: Date;

  @Column({ type: "timestamp", nullable: true })
  validTo: Date;
}