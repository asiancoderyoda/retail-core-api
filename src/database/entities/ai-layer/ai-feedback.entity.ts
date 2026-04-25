import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { AiPlanningRun } from './ai-planning-run.entity';

/*
 * AI FEEDBACK
 *
 * Human approval/rejection and realized performance.
 */
@Entity("ai_feedback")
export class AiFeedback {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => AiPlanningRun)
  planningRun: AiPlanningRun;

  @Column()
  approved: boolean;

  @Column({ nullable: true })
  feedbackReason: string;

  @Column("float", { nullable: true })
  realizedScore: number;

  @CreateDateColumn()
  createdAt: Date;
}