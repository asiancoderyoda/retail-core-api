import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../../../database/entities/tenant-layer/location.entity';


@Injectable()
export class LocationRepository {
  constructor(
    @InjectRepository(Location)
    private readonly repo: Repository<Location>,
  ) { }

  create(data: Partial<Location>) {
    return this.repo.create(data);
  }

  saveMany(locations: Location[]) {
    return this.repo.save(locations);
  }

  findByOrganizationId(organizationId: string) {
    return this.repo.find({
      where: {
        organization: { id: organizationId },
      },
    });
  }

  async belongsToOrganization(
    locationId: string,
    organizationId: string,
  ): Promise<boolean> {
    const count = await this.repo.count({
      where: { id: locationId, organization: { id: organizationId } },
    });
    return count > 0;
  }
}
