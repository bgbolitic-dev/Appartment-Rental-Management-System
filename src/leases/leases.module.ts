import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LeasesService } from './leases.services';
import { leasesController } from './leases.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [leasesController],
  providers: [LeasesService],
  exports: [LeasesService],
})
export class LeasesModule {}
