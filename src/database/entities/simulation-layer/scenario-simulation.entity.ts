import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Organization } from '../tenant-layer/organization.entity';

/*
 * SCENARIO SIMULATION
 *
 * What-if planning runs.
 *
 * Future:
 * - festive uplift
 * - supplier failure
 */
@Entity("scenario_simulations")
export class ScenarioSimulation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Organization)
  organization: Organization;

  @Column()
  simulationType: string;

  @Column("jsonb")
  inputAssumptions: any;

  @Column("jsonb")
  outputResult: any;

  @CreateDateColumn()
  createdAt: Date;
}