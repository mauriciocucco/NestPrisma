import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './filters/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👇 binds ValidationPipe to the entire application
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // 👇 apply PrismaClientExceptionFilter to entire application, requires HttpAdapterHost because it extends BaseExceptionFilter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  //Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('REST Server')
    .setDescription('A testing API created with NestJS and Prisma ORM.')
    .setVersion('1.0')
    .addTag('users')
    .addTag('companies')
    .addTag('applications')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('documentation', app, document, {
    customSiteTitle: 'REST Server Doc',
  });

  await app.listen(3000);
}
bootstrap();
