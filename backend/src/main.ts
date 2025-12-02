import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Tạo app và bật CORS trực tiếp
  const app = await NestFactory.create(AppModule, { cors: true });

  // Lắng nghe port
  await app.listen(process.env.PORT || 3001);
  console.log(`Backend running on port ${process.env.PORT || 3001}`);
}
bootstrap();
