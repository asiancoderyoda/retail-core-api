import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../../../database/entities/tenant-layer/organization.entity';


@Injectable()
export class OrganizationRepository {
  constructor(
    @InjectRepository(Organization)
    private readonly repo: Repository<Organization>,
  ) { }

  create(data: Partial<Organization>) {
    return this.repo.create(data);
  }

  save(org: Organization) {
    return this.repo.save(org);
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }
}
