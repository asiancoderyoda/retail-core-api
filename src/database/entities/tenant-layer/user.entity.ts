import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Organization } from "./organization.entity";
import { UserType } from "../../../common/enums/UserType.enum";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  authProvider: string;

  @Column({ unique: true, nullable: true })
  externalAuthId: string;

  @Column()
  email: string;

  @ManyToOne(() => Organization, { nullable: false })
  organization: Organization;

  @Column({
    type: "enum",
    enum: UserType,
    default: UserType.ORG_ADMIN,
  })
  userType: UserType;

  @CreateDateColumn()
  createdAt: Date;
}