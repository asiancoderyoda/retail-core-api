import { Controller, Get, Param } from '@nestjs/common';
import { LocationService, OrganizationService } from '../services';

@Controller('v1/auth')
export class AuthController {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly locationService: LocationService
  ) {


  }
}