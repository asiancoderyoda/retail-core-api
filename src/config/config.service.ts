import { Injectable } from '@nestjs/common';
import { type EnvVars } from './env.schema';

@Injectable()
export class AppConfigService {
    constructor(private readonly env: EnvVars) { }

    get isProduction(): boolean {
        return this.env.NODE_ENV === 'production';
    }

    get appPort(): number {
        return this.env.APP_PORT;
    }

    get database() {
        return {
            url: this.env.DB_URL,
        };
    }

    get redis() {
        return {
            host: this.env.REDIS_HOST,
            port: this.env.REDIS_PORT,
        };
    }

    get jwtSecret(): string {
        return this.env.INTERNAL_JWT_SECRET;
    }

    get logLevel(): string {
        return this.env.LOG_LEVEL;
    }
}