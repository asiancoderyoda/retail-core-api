import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { EnvSchema } from './env.schema';
import { AppConfigService } from './config.service';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,

      validate: (config: Record<string, unknown>) => {
        const parsed = EnvSchema.safeParse(config);

        if (!parsed.success) {
          console.error(
            'Invalid environment configuration:',
            parsed.error.flatten().fieldErrors
          );
          process.exit(1);
        }

        return parsed.data;
      }
    })
  ],
  providers: [
    {
      provide: AppConfigService,
      useFactory: () => {
        const parsed = EnvSchema.parse(process.env);
        return new AppConfigService(parsed);
      },
    }
  ],
  exports: [AppConfigService]
})
export class AppConfigModule {}