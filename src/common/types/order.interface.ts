export interface Order {
  id: string;
  sku: string;
  quantity: number;
  status: 'CREATED' | 'FULFILLED' | 'CANCELLED';
}