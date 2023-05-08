import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Appointment {
  @Prop()
  serviceId: string;

  @Prop()
  serviceName: string;

  @Prop()
  date: string;

  @Prop()
  time: string;
}

export type AppointmentDocument = Appointment & Document;
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
