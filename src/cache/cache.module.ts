import { Global, Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { CacheService } from './cache.service';
import { AppConfigService } from '../config/config.service';

@Global()
@Module({
  imports: [
    NestCacheModule.registerAsync({
      useFactory: (config: AppConfigService) => {
        const { host, port } = config.redis;
        const redisUrl = `redis://${host}:${port}`;
        return {
          stores: [createKeyv(redisUrl)],
          isGlobal: true,
          ttl: 300000, // default TTL in ms (optional)
        };
      },
      inject: [AppConfigService],
    }),
  ],
  providers: [CacheService],
  exports: [CacheService, NestCacheModule],
})
export class CacheModule {}