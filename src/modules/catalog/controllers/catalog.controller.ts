import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CatalogService } from '../services/catalog.service';
import { BulkCatalogDto } from '../dto/bulk-catalog.dto';

@Controller('v1/catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post(
    'organizations/:organizationId/locations/:locationId/bulk',
  )
  async bulkAddForLocation(
    @Param('organizationId', ParseUUIDPipe) organizationId: string,
    @Param('locationId', ParseUUIDPipe) locationId: string,
    @Body() body: BulkCatalogDto,
  ) {
    return this.catalogService.bulkAddForLocation(
      organizationId,
      locationId,
      body,
    );
  }
}