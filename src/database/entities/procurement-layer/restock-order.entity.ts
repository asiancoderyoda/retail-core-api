import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Organization } from '../tenant-layer/organization.entity';
import { Supplier } from '../supplier-layer/supplier.entity';
import { Location } from '../tenant-layer/location.entity';
/*
 * RESTOCK ORDER
 *
 * Represents procurement execution
 */

@Entity("restock_orders")
export class RestockOrder {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Organization)
    organization: Organization;

    @ManyToOne(() => Supplier)
    supplier: Supplier;

    @ManyToOne(() => Location)
    location: Location;

    @Column()
    status: string;

    @Column()
    createdByExternalUserId: string;

    @Column({ type: "timestamp" })
    orderedAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}