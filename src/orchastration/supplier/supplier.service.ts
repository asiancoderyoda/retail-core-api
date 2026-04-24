import { Injectable } from '@nestjs/common';

@Injectable()
export class SupplierService {
  private suppliers = [
    { sku: 'SKU_1', supplierId: 'SUP_1', leadTimeDays: 3, moq: 10 },
    { sku: 'SKU_2', supplierId: 'SUP_2', leadTimeDays: 5, moq: 20 },
  ];

  getSupplier(sku: string) {
    return this.suppliers.find((s) => s.sku === sku);
  }
}