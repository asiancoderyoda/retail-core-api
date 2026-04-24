import { Controller, Get, Param } from '@nestjs/common';
import { ForecastService } from './forecast.service';

@Controller('forecast')
export class ForecastController {
  constructor(private readonly service: ForecastService) {}

  @Get(':sku')
  predict(@Param('sku') sku: string) {
    return this.service.predictDemand(sku);
  }
}