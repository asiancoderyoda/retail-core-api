import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { PlanningItem } from '../../../database/entities/catalog-layer/planning-item.entity';

export type PlanningItemBulkRow = {
  code: string;
  name: string;
  unitOfMeasure: string;
  planningType: PlanningItem['planningType'];
  derivedFromProductDemand?: boolean;
  active?: boolean;
  shelfLifeDays?: number | null;
  maxStorageCapacity?: number | null;
};

@Injectable()
export class PlanningItemRepository {
  constructor(
    @InjectRepository(PlanningItem)
    private readonly repo: Repository<PlanningItem>,
  ) {}

  async createManyForLocation(
    organizationId: string,
    locationId: string,
    rows: PlanningItemBulkRow[],
    manager?: EntityManager,
  ): Promise<PlanningItem[]> {
    if (rows.length === 0) {
      return [];
    }
    const repo = manager ? manager.getRepository(PlanningItem) : this.repo;
    const entities = rows.map((row) =>
      repo.create({
        code: row.code,
        name: row.name,
        unitOfMeasure: row.unitOfMeasure,
        planningType: row.planningType,
        derivedFromProductDemand: row.derivedFromProductDemand ?? false,
        active: row.active ?? true,
        shelfLifeDays: row.shelfLifeDays ?? undefined,
        maxStorageCapacity: row.maxStorageCapacity ?? undefined,
        organization: { id: organizationId },
        location: { id: locationId },
      }),
    );
    return repo.save(entities);
  }
}
