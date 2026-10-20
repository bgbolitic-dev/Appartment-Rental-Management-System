
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LandlordsService } from './landlords.services';
import { LandlordsController } from './landlords.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [LandlordsController],
  providers: [LandlordsService],
  exports: [LandlordsService],
})
export class LandlordsModule {}
