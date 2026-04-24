import { Module } from '@nestjs/common';
import { InventoryModule } from './orchastration/inventory/inventory.module';
import { SupplierModule } from './orchastration/supplier/supplier.module';
import { ForecastModule } from './orchastration/forecast/forecast.module';
import { OrderModule } from './orchastration/order/order.module';
import { AppConfigModule } from './config/config.module';
import { CacheModule } from './cache/cache.module';
import { TypeOrmModule } from './database/typeorm/typeorm.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    AppConfigModule,
    CacheModule,
    TypeOrmModule,
    HealthModule,
    InventoryModule,
    SupplierModule,
    ForecastModule,
    OrderModule,
  ],
})
export class AppModule {}