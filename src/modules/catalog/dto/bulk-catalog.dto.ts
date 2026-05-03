import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'zod';

const productRowSchema = z.object({
  sku: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  isComposite: z.boolean().optional(),
});

const planningItemRowSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  unitOfMeasure: z.string().min(1),
  planningType: z.enum([
    'direct_product',
    'ingredient',
    'raw_material',
    'packaging',
  ]),
  derivedFromProductDemand: z.boolean().optional(),
  active: z.boolean().optional(),
  shelfLifeDays: z.number().int().positive().nullable().optional(),
  maxStorageCapacity: z.number().positive().nullable().optional(),
});

export const bulkCatalogSchema = z
  .object({
    products: z.array(productRowSchema).optional().default([]),
    planningItems: z.array(planningItemRowSchema).optional().default([]),
  })
  .refine(
    (data) => data.products.length > 0 || data.planningItems.length > 0,
    {
      message: 'Provide at least one product or planning item',
      path: ['products'],
    },
  );

export class BulkCatalogDto extends createZodDto(bulkCatalogSchema) {}
