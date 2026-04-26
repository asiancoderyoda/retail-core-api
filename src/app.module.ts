import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { CacheModule } from './cache/cache.module';
import { TypeOrmModule } from './database/typeorm/typeorm.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    AppConfigModule,
    CacheModule,
    TypeOrmModule,
    HealthModule,
  ],
})
export class AppModule {}