import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { OnboardOrganizationDto } from "../dto/onboard-organization.dto";
import { OrganizationRepository } from "../repositories/organization.repository";
import { LocationRepository } from "../repositories/location.repository";
import { UserRepository } from "../repositories/user.repository";
import { UserLocationAccessRepository } from "../repositories/user-location-access.repository";
import { UserType } from "../../../common/enums/UserType.enum";
import { IDENTITY_PROVIDER } from "../constants/identity-provider.constants";
import { type IdentityProvider } from "../interfaces/identity-provider.interface";
import { User } from "../../../database/entities/tenant-layer/user.entity";

@Injectable()
export class OnboardingService {
  constructor(
    @Inject(IDENTITY_PROVIDER)
    private readonly identityProvider: IdentityProvider,
    private readonly organizationRepository: OrganizationRepository,
    private readonly locationRepository: LocationRepository,
    private readonly userRepository: UserRepository,
    private readonly userLocationAccessRepository: UserLocationAccessRepository,
  ) { }

  async onboardOrganization(dto: OnboardOrganizationDto) {
    let createdUser: User | null = null;

    try {
      /**
       * 1. Create Organization in DB (source of truth)
       */
      const org = await this.organizationRepository.save(
        this.organizationRepository.create({
          name: dto.organizationName,
          businessType: dto.businessType,
          currency: dto.currency,
          timezone: dto.timezone,
        })
      );

      /**
       * 2. Create Admin User in DB first
       */
      createdUser = await this.userRepository.save(
        this.userRepository.create({
          email: dto.adminEmail,
          organization: org,
          userType: UserType.ORG_ADMIN,
        })
      );

      /**
       * 3. Create Locations
       */
      const locations = await this.locationRepository.saveMany(
        dto.locations.map((loc) =>
          this.locationRepository.create({
            ...loc,
            organization: org,
          })
        )
      );

      /**
       * 4. Give Admin user access to all locations
       */
      await this.userLocationAccessRepository.saveMany(
        locations.map((loc, index) =>
          this.userLocationAccessRepository.create({
            user: createdUser!,
            location: loc,
            isActive: true,
            isDefault: index === 0,
          })
        )
      );

      /**
       * 5. Provision user in external identity provider
       */
      const identity = await this.identityProvider.createUser({
        email: dto.adminEmail,
        tempPassword: dto.adminTempPassword,
        organizationId: org.id,
        userType: UserType.ORG_ADMIN,
      });

      /**
       * 6. Update DB user mapping
       */
      createdUser.externalAuthId = identity.externalAuthId;
      createdUser.authProvider = "keycloak";
      await this.userRepository.save(createdUser);

      return {
        success: true,
        organizationId: org.id,
        adminUserId: createdUser.id,
      };
    } catch (err) {
      console.error("Onboarding failed:", err);
      throw new InternalServerErrorException("Tenant onboarding failed");
    }
  }
}