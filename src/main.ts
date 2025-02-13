import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import * as fs from 'fs';
import * as https from 'https';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // HTTPS Options with self-signed certificates
  const httpsOptions = {
    key: fs.readFileSync('selfsigned.key'),
    cert: fs.readFileSync('selfsigned.crt'),
  };

  // Enable validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Start HTTPS server
  const server = https.createServer(
    httpsOptions,
    app.getHttpAdapter().getInstance(),
  );
  await app.init(); // Ensure routes are initialized
  server.listen(3000, () => {
    console.log('Server running on https://localhost:3000');
  });
}

bootstrap();
