import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Organization } from '../tenant-layer/organization.entity';

/*
 * PLANNING ITEM (MOST IMPORTANT ENTITY)
 *
 * This is the universal replenishable unit.
 *
 * Covers:
 * - retail SKU
 * - ingredient
 * - raw material
 * - packaging item
 *
 * Why this exists:
 * - Unifies retail + restaurant + manufacturing
 * - Forecasting, inventory, procurement all depend on this
 *
 * Future:
 * - batch tracking
 * - expiry tracking
 * - multi-UOM conversions
 */
@Entity("planning_items")
export class PlanningItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Organization)
  organization: Organization;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  unitOfMeasure: string;

  @Column()
  planningType: "direct_product" | "ingredient" | "raw_material" | "packaging";

  // If demand is derived via BOM explosion
  @Column({ default: false })
  derivedFromProductDemand: boolean;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;
}