import { Injectable, NotFoundException } from "@nestjs/common";
import { OrganizationRepository } from "../repositories/organization.repository";

@Injectable()
export class OrganizationService {
  constructor(private readonly organizationRepository: OrganizationRepository) {}

  async getOrganizationById(id: string) {
    const org = await this.organizationRepository.findById(id);

    if (!org) {
      throw new NotFoundException("Organization not found");
    }

    return org;
  }
}