import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Product } from '../catalog-layer/product.entity';

@Entity("demand_plans")
export class DemandPlan {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Location)
  location: Location;

  @Column({ type: "date" })
  bucketDate: string;

  @Column("float")
  forecast: number;

  @Column("float", { nullable: true })
  p50: number;

  @Column("float", { nullable: true })
  p90: number;

  @Column("float", { nullable: true })
  coefficientOfVariation: number;

  @Column("float", { nullable: true })
  seasonalityIndex: number;
}