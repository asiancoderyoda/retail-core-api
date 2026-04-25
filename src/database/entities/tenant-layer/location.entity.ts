import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Organization } from './organization.entity';

/*
 * LOCATION
 *
 * Represents physical nodes:
 * - store
 * - kitchen
 * - warehouse
 *
 * Enables:
 * - multi-location planning
 * - stock visibility per outlet
 *
 * Future:
 * - inter-location transfers
 * - geo-based planning
 */
@Entity("locations")
export class Location {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Organization)
  organization: Organization;

  @Column()
  name: string;

  @Column()
  type: "store" | "warehouse" | "kitchen";

  @CreateDateColumn()
  createdAt: Date;
}