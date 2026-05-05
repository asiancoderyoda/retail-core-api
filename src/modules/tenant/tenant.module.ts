import { Module } from '@nestjs/common';
import { CacheModule } from '../../cache/cache.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from '../../database/entities/tenant-layer/organization.entity';
import { Location } from '../../database/entities/tenant-layer/location.entity';
import { User } from '../../database/entities/tenant-layer/user.entity';
import { UserLocationAccess } from '../../database/entities/tenant-layer/user-location-access.entity';
import { AuthService, LocationService, OnboardingService, OrganizationService } from './services';
import { LocationRepository, OrganizationRepository, UserLocationAccessRepository, UserRepository } from './repositories';
import { AuthController, OnboardingController } from './controllers';


@Module({
    imports: [CacheModule, TypeOrmModule.forFeature([Organization, Location, User, UserLocationAccess])],
    providers: [OrganizationService, LocationService, OnboardingService, AuthService, OrganizationRepository, LocationRepository, UserRepository, UserLocationAccessRepository],
    controllers: [AuthController, OnboardingController],
    exports: [LocationRepository, UserRepository, UserLocationAccessRepository],
})
export class TenantModule { } 