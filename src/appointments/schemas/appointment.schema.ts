import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true }) 
  selectedService: string;

  @Prop({ required: true })  // add this
  customerName: string;  // add this
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
