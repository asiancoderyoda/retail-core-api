import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Supplier } from "./supplier.entity";
import { PlanningItem } from "../catalog-layer/planning-item.entity";

/*
 * SUPPLIER CATALOG
 *
 * Supplier capability per planning item.
 */
@Entity("supplier_catalog")
export class SupplierCatalog {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Supplier)
  supplier: Supplier;

  @ManyToOne(() => PlanningItem)
  planningItem: PlanningItem;

  @Column("float")
  unitPrice: number;

  @Column("float")
  moq: number;

  @Column("int")
  leadTimeDays: number;

  @Column("float")
  maxCapacity: number;

  @Column("float", { default: 1 })
  fillRate: number;
}