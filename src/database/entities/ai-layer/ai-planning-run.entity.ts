import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { PlanningItem } from '../catalog-layer/planning-item.entity';
/*
 * AI PLANNING RUN
 *
 * Stores:
 * - input payload
 * - output recommendation
 *
 * Enables:
 * - explainability
 * - debugging
 * - learning
 */
@Entity("ai_planning_runs")
export class AiPlanningRun {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => PlanningItem)
  planningItem: PlanningItem;

  @Column("jsonb")
  inputPayload: any;

  @Column("jsonb")
  outputPayload: any;

  @Column("float")
  confidenceScore: number;

  @CreateDateColumn()
  createdAt: Date;
}