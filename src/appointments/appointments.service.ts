// src/appointments/appointments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentModel.find().exec();
  }

  async getTimeSlots(date: string): Promise<{ time: string; isAvailable: boolean }[]> {
    const appointments = await this.appointmentModel.find({ date }).exec();
    const bookedTimes = appointments.map((appointment) => appointment.time);

    const availableTimeSlots = this.generateTimeSlots().map((time) => {
      const isAvailable = !bookedTimes.includes(time);
      return { time, isAvailable };
    });

    return availableTimeSlots;
  }

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const newAppointment = new this.appointmentModel(createAppointmentDto);
    return await newAppointment.save();
  }

  private generateTimeSlots(): string[] {
    const timeSlots = [];
    const startHour = 9;
    const endHour = 17;
    const slotDuration = 60;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        const time = `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`;
        timeSlots.push(time);
      }
    }

    return timeSlots;
  }
}
