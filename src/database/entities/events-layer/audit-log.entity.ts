import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Organization } from '../tenant-layer/organization.entity';
import { Location } from '../tenant-layer/location.entity';

@Entity("audit_logs")
export class AuditLog {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Organization)
  organization: Organization;

  @ManyToOne(() => Location, { nullable: true })
  location: Location;

  @Column()
  actorExternalUserId: string;

  @Column()
  action: string;

  @Column()
  entityType: string;

  @Column()
  entityId: string;

  @Column("jsonb")
  payload: any;

  @CreateDateColumn()
  createdAt: Date;
}