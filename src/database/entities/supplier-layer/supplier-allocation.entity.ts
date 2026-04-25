import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Supplier } from "./supplier.entity";
import { PlanningItem } from "../catalog-layer/planning-item.entity";

/*
 * SUPPLIER ALLOCATION
 *
 * Preferred sourcing split.
 *
 * Example:
 * Eggs -> Supplier A 70%, Supplier B 30%
 */
@Entity("supplier_allocations")
export class SupplierAllocation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => PlanningItem)
  planningItem: PlanningItem;

  @ManyToOne(() => Supplier)
  supplier: Supplier;

  @Column("float")
  allocationPct: number;

  @Column({ default: 1 })
  priority: number;
}