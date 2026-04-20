import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { SupplierModule } from './supplier/supplier.module';
import { ForecastModule } from './forecast/forecast.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    InventoryModule,
    SupplierModule,
    ForecastModule,
    OrderModule,
  ],
})
export class AppModule {}