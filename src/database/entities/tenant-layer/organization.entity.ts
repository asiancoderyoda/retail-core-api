import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { BusinessType } from '../../../common/enums/BusinessType.enum';
import { Currency } from '../../../common/enums/Currency.enum';

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

  @Column({ type: "enum", enum: BusinessType, default: BusinessType.RETAIL })
  businessType: BusinessType;

  @Column({ type: "enum", enum: Currency, default: Currency.INR })
  currency: Currency;

  @Column()
  timezone: string;

  // External auth provider mapping (Keycloak / Cognito etc.)
  @Column({ nullable: true })
  externalTenantId: string;

  @CreateDateColumn()
  createdAt: Date;
}