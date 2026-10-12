import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PropertiesService } from './properties.services';
import { PropertiesController } from './properties.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesService],
})
export class PropertiesModule {}