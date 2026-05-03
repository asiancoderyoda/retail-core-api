import { Module } from '@nestjs/common';
import { CacheModule } from '../../cache/cache.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../database/entities/catalog-layer/product.entity';
import { PlanningItem } from '../../database/entities/catalog-layer/planning-item.entity';
import { BillOfMaterial } from '../../database/entities/catalog-layer/bill-of-material.entity';
import {
  BOMRepository,
  PlanningItemRepository,
  ProductRepository,
} from './repositories';
import { CatalogController } from './controllers';
import { CatalogService } from './services';
import { TenantModule } from '../tenant/tenant.module';

@Module({
  imports: [
    CacheModule,
    TypeOrmModule.forFeature([Product, PlanningItem, BillOfMaterial]),
    TenantModule,
  ],
  providers: [
    CatalogService,
    ProductRepository,
    PlanningItemRepository,
    BOMRepository,
  ],
  controllers: [CatalogController],
  exports: [CatalogService],
})
export class CatalogModule {} 