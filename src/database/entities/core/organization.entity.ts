import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity("organizations")
export class Organization {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    businessType: string;

    @Column({ default: "INR" })
    defaultCurrency: string;

    @CreateDateColumn()
    createdAt: Date;
}