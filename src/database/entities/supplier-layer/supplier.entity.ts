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
 * SUPPLIER MASTER
 */
@Entity("suppliers")
export class Supplier {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Organization)
    organization: Organization;

    @ManyToOne(() => Location)
    primaryLocation: Location;

    @Column()
    name: string;

    @Column()
    contactName: string;

    @Column()
    contactPhone: string;

    @Column("float", { default: 1 })
    reliabilityScore: number;

    @CreateDateColumn()
    createdAt: Date;
}