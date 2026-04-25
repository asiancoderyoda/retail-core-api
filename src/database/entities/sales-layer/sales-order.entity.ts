import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { Organization } from "../tenant-layer/organization.entity";
import { Location } from "../tenant-layer/location.entity";

/*
 * SALES ORDER
 *
 * Raw demand source
 *
 * Enables:
 * - demand history generation
 * - forecasting
 */
@Entity("sales_orders")
export class SalesOrder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Organization)
  organization: Organization;

  @ManyToOne(() => Location)
  location: Location;

  @Column()
  externalOrderId: string;

  @Column({ type: "timestamp" })
  orderTime: Date;
}