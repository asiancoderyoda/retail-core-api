import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity("sales_orders")
export class SalesOrder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Location)
  location: Location;

  @Column({ type: "timestamp" })
  orderTime: Date;

  @CreateDateColumn()
  createdAt: Date;
}