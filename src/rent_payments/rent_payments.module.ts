import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Rent_PaymentsController } from './rent_payments.controller';
import { Rent_PaymentsService } from './rent_payments.services';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [Rent_PaymentsController],
  providers: [Rent_PaymentsService],
  exports: [Rent_PaymentsService],
})
export class Rent_PaymentsModule {}
