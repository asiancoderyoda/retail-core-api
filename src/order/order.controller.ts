import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.createOrder(body);
  }

  @Get()
  getAll() {
    return this.service.getOrders();
  }
}