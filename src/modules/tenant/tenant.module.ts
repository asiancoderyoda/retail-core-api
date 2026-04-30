import { Module } from '@nestjs/common';
import { OrganizationService } from './services/organization.service';
import { CacheModule } from '../../cache/cache.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from '../../database/entities/tenant-layer/organization.entity';
import { Location } from '../../database/entities/tenant-layer/location.entity';
import { LocationService } from './services/location.service';
import { LocationRepository } from './repositories/location.repository';
import { OrganizationRepository } from './repositories/organization.repository';
import { AuthController } from './controllers/auth.controller';
import { OnboardingController } from './controllers/onboarding.controller';
import { AuthService } from './services/auth.service';
import { OnboardingService } from './services/onboarding.service';

@Module({
    imports: [CacheModule, TypeOrmModule.forFeature([Organization, Location])],
    providers: [OrganizationService, LocationService, OnboardingService, AuthService, OrganizationRepository, LocationRepository],
    controllers: [AuthController, OnboardingController],
    exports: [],
})
export class TenantModule { } 