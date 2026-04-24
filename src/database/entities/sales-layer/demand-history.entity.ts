import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Product } from '../catalog-layer/product.entity';

@Entity("demand_history")
export class DemandHistory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Location)
  location: Location;

  @Column({ type: "date" })
  date: string;

  @Column("float")
  unitsSold: number;
}