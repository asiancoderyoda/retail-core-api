import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Organization } from './organization.entity';
import { LocationType } from '../../../common/enums/LocationType.enum';

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

  @ManyToOne(() => Organization, {
    nullable: false,
    onDelete: 'CASCADE'
  })
  organization: Organization;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ type: "enum", enum: LocationType })
  type: LocationType;

  @CreateDateColumn()
  createdAt: Date;
}