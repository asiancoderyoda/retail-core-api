import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { SalesOrder } from './sales-order.entity';
import { Product } from '../catalog-layer/product.entity';

@Entity("sales_line_items")
export class SalesLineItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => SalesOrder)
  order: SalesOrder;

  @ManyToOne(() => Product)
  product: Product;

  @Column("float")
  quantity: number;

  @Column("float")
  price: number;
}