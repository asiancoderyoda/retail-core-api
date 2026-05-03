import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillOfMaterial } from '../../../database/entities/catalog-layer/bill-of-material.entity';


@Injectable()
export class BOMRepository {
  constructor(
    @InjectRepository(BillOfMaterial)
    private readonly repo: Repository<BillOfMaterial>,
  ) {}

}
