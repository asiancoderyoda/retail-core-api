import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { RestockOrder } from './restock-order.entity';
import { PlanningItem } from '../catalog-layer/planning-item.entity';

/*
 * RESTOCK ORDER LINE
 */
@Entity("restock_order_lines")
export class RestockOrderLine {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => RestockOrder)
  order: RestockOrder;

  @ManyToOne(() => PlanningItem)
  planningItem: PlanningItem;

  @Column("float")
  quantity: number;

  @Column("float", { default: 0 })
  receivedQty: number;

  @Column("float")
  unitPrice: number;
}