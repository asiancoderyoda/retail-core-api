import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Organization } from './organization.entity';

@Entity("locations")
export class Location {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Organization)
  org: Organization;

  @Column()
  name: string;

  @Column()
  type: string; // store, warehouse, kitchen

  @Column()
  timezone: string;

  @CreateDateColumn()
  createdAt: Date;
}