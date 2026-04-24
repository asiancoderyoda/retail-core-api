import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Organization } from '../core/organization.entity';

/**
 * Sellable product. Can be a restaurant dish, or a retail product. 
 * If isComposite=true, then it's a restaurant dish which is made up of multiple inventory items. 
 * If isComposite=false, then it's a simple retail product which is made up of a single inventory item.
 */
@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Organization)
  org: Organization;

  @Column({ unique: true })
  sku: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  unitOfMeasure: string; // piece, plate

  @Column({ default: false })
  isComposite: boolean; // true for restaurant dishes

  @CreateDateColumn()
  createdAt: Date;
}