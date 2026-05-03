import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Product } from '../../../database/entities/catalog-layer/product.entity';

export type ProductBulkRow = {
  sku: string;
  name: string;
  category: string;
  isComposite?: boolean;
};

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  async createManyForLocation(
    organizationId: string,
    locationId: string,
    rows: ProductBulkRow[],
    manager?: EntityManager,
  ): Promise<Product[]> {
    if (rows.length === 0) {
      return [];
    }
    const repo = manager ? manager.getRepository(Product) : this.repo;
    const entities = rows.map((row) =>
      repo.create({
        sku: row.sku,
        name: row.name,
        category: row.category,
        isComposite: row.isComposite ?? false,
        organization: { id: organizationId },
        location: { id: locationId },
      }),
    );
    return repo.save(entities);
  }
}
