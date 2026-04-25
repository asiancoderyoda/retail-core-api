import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Supplier } from "./supplier.entity";
import { PlanningItem } from "../catalog-layer/planning-item.entity";

/*
 * SUPPLIER DISRUPTION LOG
 *
 * Logs:
 * - delays
 * - partial inability
 * - cancellation
 *
 * Future AI can factor this into procurement decisions.
 */
@Entity("supplier_disruptions")
export class SupplierDisruption {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Supplier)
  supplier: Supplier;

  @ManyToOne(() => PlanningItem)
  planningItem: PlanningItem;

  @Column()
  disruptionType: string;

  @Column()
  notes: string;

  @CreateDateColumn()
  createdAt: Date;
}