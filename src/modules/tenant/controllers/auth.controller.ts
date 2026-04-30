import { Controller, Get, Param } from '@nestjs/common';
import { OrganizationService } from '../services/organization.service';
import { LocationService } from '../services/location.service';

@Controller('v1/auth')
export class AuthController {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly locationService: LocationService
  ) {


  }
}