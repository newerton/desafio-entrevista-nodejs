import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [CompanyModule, VehicleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
