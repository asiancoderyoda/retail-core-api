import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";
import { BusinessType } from "../../../common/enums/BusinessType.enum";
import { Currency } from "../../../common/enums/Currency.enum";
import { LocationType } from "../../../common/enums/LocationType.enum";

const locationSchema = z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    email: z.email(),
    phone: z.string().min(5),
    type: z.enum(LocationType),
});

export const onboardOrganizationSchema = z.object({
    organizationName: z.string().min(1),
    businessType: z.enum(BusinessType),
    currency: z.enum(Currency),
    timezone: z.string().min(1),
    adminEmail: z.email(),
    adminTempPassword: z.string().min(6),
    locations: z.array(locationSchema).min(1),
    organizationPhone: z.string().optional(),
    organizationAddress: z.string().optional(),
    taxId: z.string().optional(),
});

export class OnboardOrganizationDto extends createZodDto(
    onboardOrganizationSchema
) { }