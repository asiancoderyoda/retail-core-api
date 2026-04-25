import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Organization } from '../tenant-layer/organization.entity';
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

  @Column()
  eventType: string;

  @Column("jsonb")
  payload: any;

  @Column({ default: false })
  processed: boolean;

  @CreateDateColumn()
  createdAt: Date;
}