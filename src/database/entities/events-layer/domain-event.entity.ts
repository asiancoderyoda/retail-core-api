import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Organization } from '../tenant-layer/organization.entity';
import { Location } from '../tenant-layer/location.entity';
/*
 * DOMAIN EVENTS
 *
 * Event driven backbone
 *
 * Enables:
 * - async workflows
 * - eventual consistency
 */
@Entity("domain_events")
export class DomainEvent {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Organization)
  organization: Organization;

  @ManyToOne(() => Location, { nullable: true })
  location: Location;

  @Column()
  eventType: string;

  @Column()
  aggregateType: string;

  @Column()
  aggregateId: string;

  @Column("jsonb")
  payload: any;

  @Column({ default: false })
  processed: boolean;

  @Column({ nullable: true })
  processedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}