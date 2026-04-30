import { Controller, Get, Param } from '@nestjs/common';
import { OrganizationService } from '../services/organization.service';
import { LocationService } from '../services/location.service';

@Controller('onboarding')
export class OnboardingController {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly locationService: LocationService
  ) {
    
  }
}