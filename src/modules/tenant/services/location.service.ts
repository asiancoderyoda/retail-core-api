import { Injectable } from "@nestjs/common";
import { LocationRepository } from "../repositories/location.repository";

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  getLocationsByOrganizationId(orgId: string) {
    return this.locationRepository.findByOrganizationId(orgId);
  }
}