import { Controller, Get, Param } from '@nestjs/common';
import { SupplierService } from './supplier.service';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly service: SupplierService) {}

  @Get(':sku')
  getSupplier(@Param('sku') sku: string) {
    return this.service.getSupplier(sku);
  }
}