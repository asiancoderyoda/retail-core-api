import { Controller, Get, Param } from '@nestjs/common';
import { LocationService, OrganizationService } from '../services';

@Controller('onboarding')
export class OnboardingController {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly locationService: LocationService
  ) {
    
  }
}