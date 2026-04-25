import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Product } from './product.entity';
import { PlanningItem } from './planning-item.entity';

/*
 * BILL OF MATERIALS (BOM)
 *
 * Maps product → planning item consumption
 *
 * Enables:
 * - ingredient demand explosion
 * - manufacturing logic
 *
 * Future:
 * - versioning
 * - conditional BOMs
 */
@Entity("bill_of_materials")
export class BillOfMaterial {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => PlanningItem)
  planningItem: PlanningItem;

  @Column("float")
  quantityRequired: number;

  @Column("float", { default: 0 })
  yieldLossPct: number;

  @Column({ default: false })
  substitutable: boolean;
}