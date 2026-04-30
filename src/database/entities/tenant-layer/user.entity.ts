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

  // Keycloak subject UUID
  @Column({ unique: true })
  externalId: string;

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