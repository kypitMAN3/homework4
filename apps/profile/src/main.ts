import { NestFactory } from '@nestjs/core';
import { ProfileModule } from './profile.module';
import { RmqService } from '@app/common/rmq/rmq.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ProfileModule);
  const configService = app.get(ConfigService)

  await app.listen(configService.get('PORT'));
}
bootstrap();
