// src/database/typeorm.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService } from '../../config/config.service';

@Module({
    imports: [
        NestTypeOrmModule.forRootAsync({
            inject: [AppConfigService],
            useFactory: (config: AppConfigService) => {
                const db = config.database;

                return {
                    type: 'postgres' as const,
                    url: db.url,

                    /*
                    * Supabase requires SSL
                    */
                    // ssl: { rejectUnauthorized: false },

                    /*
                    * Pool tuning (safe defaults for a single Nest instance)
                    */
                    extra: {
                        max: 15, // max connections in pool
                        idleTimeoutMillis: 30_000,
                        connectionTimeoutMillis: 10_000,
                    },

                    /*
                    * App defaults
                    */
                    autoLoadEntities: true,
                    synchronize: !config.isProduction, // use migrations
                    logging: !config.isProduction,
                };
            },
        }),
    ],
})
export class TypeOrmModule { }