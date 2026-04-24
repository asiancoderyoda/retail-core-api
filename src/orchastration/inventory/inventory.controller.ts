import { Controller, Get, Param } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Get(':sku')
  getInventory(@Param('sku') sku: string) {
    return this.service.getInventory(sku);
  }

  @Get()
  getLowStock() {
    return this.service.getLowStockItems();
  }
}