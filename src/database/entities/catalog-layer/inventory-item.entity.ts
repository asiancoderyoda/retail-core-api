import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Organization } from '../core/organization.entity';

/**
 * Raw Material / SKU that is used to make restaurant dishes (composite products)
 */
@Entity("inventory_items")
export class InventoryItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Organization)
  org: Organization;

  @Column({ unique: true })
  sku: string;

  @Column()
  name: string;

  @Column()
  unitOfMeasure: string; // kg, gm, ml, piece

  @Column({ default: false })
  perishable: boolean;

  @Column({ nullable: true })
  shelfLifeDays: number;

  @CreateDateColumn()
  createdAt: Date;
}