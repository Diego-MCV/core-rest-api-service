import { NestFactory } from '@nestjs/core';
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule); // Sin paréntesis aquí también
    await app.listen(3000);
}
bootstrap();