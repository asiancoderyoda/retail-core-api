import { z } from 'zod';

export const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']),
  APP_PORT: z.coerce.number().int().min(1024).max(65535),
  DB_URL: z.string().url(),

  REDIS_HOST: z.string().min(1),
  REDIS_PORT: z.coerce.number().int().positive(),

  INTERNAL_JWT_SECRET: z.string().min(32),

  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

export type EnvVars = z.infer<typeof EnvSchema>;