import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryService {
  private inventory = [
    { sku: 'SKU_1', stock: 5, reorderPoint: 20 },
    { sku: 'SKU_2', stock: 50, reorderPoint: 30 },
  ];

  getInventory(sku: string) {
    return this.inventory.find((i) => i.sku === sku);
  }

  getLowStockItems() {
    return this.inventory.filter((i) => i.stock < i.reorderPoint);
  }
}