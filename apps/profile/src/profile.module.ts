import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { profilesProviders } from './profiles.providers';
import { DatabaseModule, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    RmqModule
  ],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    ...profilesProviders
  ],
})
export class ProfileModule {}
