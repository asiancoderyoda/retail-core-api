import { Injectable } from '@nestjs/common';
import { Order } from '../../common/types/order.interface';

@Injectable()
export class OrderService {
  private orders: Order[] = [];

  createOrder(order: Order) {
    this.orders.push(order);
    return {
      status: 'CREATED',
      order,
    };
  }

  getOrders() {
    return this.orders;
  }
}