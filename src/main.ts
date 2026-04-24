import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ZodValidationPipe } from 'nestjs-zod';
import { AppConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(AppConfigService)

  app.useGlobalPipes(new ZodValidationPipe());
  app.use(helmet());
  app.enableShutdownHooks();

  await app.listen(config.appPort);
}
bootstrap().catch((err) => {
  console.error('Error during app bootstrap:', err);
  process.exit(1);
});
