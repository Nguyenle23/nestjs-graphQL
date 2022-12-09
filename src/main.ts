import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 8080;
  app.useGlobalPipes(new ValidationPipe());
  // Since Im using GraphQL, the path is /graphql
  console.log(`Server is running on: http://localhost:${port}/graphql`);
  await app.listen(port);
}
bootstrap();
