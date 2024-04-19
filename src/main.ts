import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'process';
import * as morgan from 'morgan';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.use(morgan('dev'));

  app.use(helmet());

  const corsOptions = {
    origin: ['http://localhost:4000'],
  };
  app.enableCors(corsOptions);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Smart House')
    .setDescription('Smart House application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  console.log(process.env);

  await app.listen(process.env.PORT || 7001);
}
bootstrap();
