import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { CacheModule } from './cache/cache.module';
import { TypeOrmModule } from './database/typeorm/typeorm.module';
import { HealthModule } from './health/health.module';
import { TenantModule } from './modules/tenant/tenant.module';

@Module({
  imports: [
    AppConfigModule,
    CacheModule,
    TypeOrmModule,
    HealthModule,
    TenantModule,
  ],
})
export class AppModule {}