import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Organization } from '../core/organization.entity';

@Entity("suppliers")
export class Supplier {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Organization)
  org: Organization;

  @Column()
  name: string;

  @Column()
  contactName: string;

  @Column()
  contactPhone: string;

  @Column("float", { default: 1 })
  reliability: number;

  @CreateDateColumn()
  createdAt: Date;
}