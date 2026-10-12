import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PropertiesModule } from './properties/properties.module';
import { UnitsModule } from './units/units.module';
import { TenantsModule } from './tenants/tenants.module';
import { LeasesModule } from './leases/leases.module';
import { Rent_PaymentsModule } from './rent_payments/rent_payments.module';
import { Maintenance_RequestsModule } from './maintenance_requests/maintenance_requests.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, UsersModule, PropertiesModule, UnitsModule, TenantsModule, LeasesModule, Rent_PaymentsModule,Maintenance_RequestsModule, AuthModule],
})
export class AppModule {}