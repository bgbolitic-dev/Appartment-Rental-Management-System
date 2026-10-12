import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TenantsService } from './tenants.services';
import { TenantsController } from './tenants.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TenantsController],
  providers: [TenantsService],
  exports: [TenantsService],
})
export class TenantsModule {}
