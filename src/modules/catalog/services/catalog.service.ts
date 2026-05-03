import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BulkCatalogDto } from '../dto/bulk-catalog.dto';
import { LocationRepository } from '../../tenant/repositories';
import {
  PlanningItemRepository,
  ProductRepository,
} from '../repositories';

@Injectable()
export class CatalogService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly locationRepository: LocationRepository,
    private readonly productRepository: ProductRepository,
    private readonly planningItemRepository: PlanningItemRepository,
  ) {}

  async bulkAddForLocation(
    organizationId: string,
    locationId: string,
    body: BulkCatalogDto,
  ): Promise<{
    organizationId: string;
    locationId: string;
    products: Array<{ id: string; sku: string; name: string }>;
    planningItems: Array<{ id: string; code: string; name: string }>;
  }> {
    const locationOk = await this.locationRepository.belongsToOrganization(
      locationId,
      organizationId,
    );
    if (!locationOk) {
      throw new NotFoundException(
        'Location not found for this organization',
      );
    }

    return this.dataSource.transaction(async (manager) => {
      const products = await this.productRepository.createManyForLocation(
        organizationId,
        locationId,
        body.products,
        manager,
      );
      const planningItems =
        await this.planningItemRepository.createManyForLocation(
          organizationId,
          locationId,
          body.planningItems,
          manager,
        );

      return {
        organizationId,
        locationId,
        products: products.map((p) => ({
          id: p.id,
          sku: p.sku,
          name: p.name,
        })),
        planningItems: planningItems.map((pi) => ({
          id: pi.id,
          code: pi.code,
          name: pi.name,
        })),
      };
    });
  }
}