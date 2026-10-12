import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UnitsService } from './units.services';
import { UnitsController } from './units.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UnitsController],
  providers: [UnitsService],
  exports: [UnitsService],
})
export class UnitsModule {}