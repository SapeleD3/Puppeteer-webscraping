import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Server } from 'http';
import helmet from 'helmet';

async function bootstrap() {
  try {
    const app: INestApplication = await NestFactory.create(AppModule, {
      bufferLogs: true,
    });
    const server = app.getHttpServer() as Server;
    server.keepAliveTimeout = 60000; // in millseconds, 60s

    app.use(helmet());
    app.enableCors();

    const config = app.get(ConfigService);

    const PORT = config.get<number>('port');
    Logger.debug(`Attempt initializing app on port: ${PORT} `);

    await app.listen(PORT);
    const url = await app.getUrl();
    Logger.log(`App initialized successfully, Listening at: ${url}`);
  } catch (error) {
    Logger.error(error);
  }
}

bootstrap();
