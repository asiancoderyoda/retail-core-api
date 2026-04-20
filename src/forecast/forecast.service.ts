import { Injectable } from '@nestjs/common';

@Injectable()
export class ForecastService {
  predictDemand(sku: string) {
    // simple mocked logic
    if (sku === 'SKU_1') {
      return { sku, predictedDemand: 40 };
    }

    return { sku, predictedDemand: 10 };
  }
}