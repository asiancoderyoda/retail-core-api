import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

/*
 * ORGANIZATION (TENANT ROOT)
 *
 * Represents a business using the platform.
 *
 * Capabilities:
 * - Multi-tenant SaaS isolation
 * - Supports multiple business types (retail, restaurant, manufacturing)
 *
 * Future:
 * - Billing / subscription
 * - Region-specific configs
 */
@Entity("organizations")
export class Organization {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  businessType: "retail" | "restaurant" | "manufacturing";

  @Column({ default: "INR" })
  currency: string;

  @Column()
  timezone: string;

  // External auth provider mapping (Keycloak / Cognito etc.)
  @Column({ nullable: true })
  externalTenantId: string;

  @CreateDateColumn()
  createdAt: Date;
}