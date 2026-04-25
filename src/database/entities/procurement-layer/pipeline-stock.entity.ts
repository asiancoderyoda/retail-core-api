import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { RestockOrder } from './restock-order.entity';
import { PlanningItem } from '../catalog-layer/planning-item.entity';

/*
 * PIPELINE STOCK
 *
 * Ordered but not yet received.
 */
@Entity("pipeline_stock")
export class PipelineStock {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => PlanningItem)
  planningItem: PlanningItem;

  @ManyToOne(() => Location)
  location: Location;

  @ManyToOne(() => RestockOrder)
  sourceOrder: RestockOrder;

  @Column("float")
  quantity: number;

  @Column({ type: "timestamp" })
  expectedArrival: Date;

  @Column()
  status: string;
}