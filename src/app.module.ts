// src/app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogueModule } from './catalogue/catalogue.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CatalogueModule,
    AppointmentsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
})
export class AppModule {}
