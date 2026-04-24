import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { RestockOrder } from './restock-order.entity';
import { InventoryItem } from '../catalog-layer/inventory-item.entity';

@Entity("restock_order_lines")
export class RestockOrderLine {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => RestockOrder)
  order: RestockOrder;

  @ManyToOne(() => InventoryItem)
  inventoryItem: InventoryItem;

  @Column("float")
  quantity: number;

  @Column("float")
  receivedQty: number;
}