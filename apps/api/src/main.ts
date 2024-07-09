import { NestFactory } from '@nestjs/core';
import { ChatModule } from './chat.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ChatModule);
  app.setGlobalPrefix('api');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('The authentication API description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'apiKey', name: 'Authorization', in: 'header' })
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-doc', app, document);

  await app.listen(3000);
}
bootstrap();
