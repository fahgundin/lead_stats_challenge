import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // permite só o frontend
    credentials: true,               // se você estiver usando cookies/autenticação
  })


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
