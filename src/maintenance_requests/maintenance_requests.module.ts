import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Maintenance_RequestsService } from './maintenance_requests.services';
import { Maintenance_RequestsController } from './maintenance_requests.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [Maintenance_RequestsController],
  providers: [Maintenance_RequestsService],
  exports: [Maintenance_RequestsService],
})
export class Maintenance_RequestsModule {}
