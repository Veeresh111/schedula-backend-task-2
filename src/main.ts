import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Add '0.0.0.0' to explicitly tell Render how to route the traffic
  await app.listen(process.env.PORT || 10000, '0.0.0.0');
}
bootstrap();