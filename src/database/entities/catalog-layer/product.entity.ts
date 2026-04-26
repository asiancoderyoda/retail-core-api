import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Organization } from '../tenant-layer/organization.entity';
import { Location } from '../tenant-layer/location.entity';

/*
 * PRODUCT (SELLABLE ENTITY)
 *
 * Represents what is sold to customer.
 *
 * Retail:
 * - maps 1:1 to planning item
 *
 * Restaurant:
 * - maps to multiple planning items via BOM
 *
 * Future:
 * - pricing
 * - category hierarchy
 */
@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Organization)
  organization: Organization;

  @ManyToOne(() => Location)
  location: Location;

  @Column()
  sku: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column({ default: false })
  isComposite: boolean;

  @CreateDateColumn()
  createdAt: Date;
}