// src/appointments/appointments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto/create-appointment.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentModel.find().exec();
  }
  async findByUser(username: string): Promise<Appointment[]> {
    return this.appointmentModel.find({ username }).exec();
  }

  async getTimeSlots(date: string, selectedService: string): Promise<{ time: string; isAvailable: boolean }[]> {
    console.log(date, selectedService);
    const appointments = await this.appointmentModel.find({ date, selectedService }).exec();
    const bookedTimes = appointments.map((appointment) => appointment.time);

    const availableTimeSlots = this.generateTimeSlots().map((time) => {
      const isAvailable = !bookedTimes.includes(time);
      return { time, isAvailable };
    });

    return availableTimeSlots;
  }

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const { date, time, selectedService, customerName } = createAppointmentDto; // Include customerName here
  
    const existingAppointment = await this.appointmentModel
      .findOne({ date, time, selectedService })
      .exec();
  
    if (existingAppointment) {
      throw new HttpException('Time slot is already booked', HttpStatus.BAD_REQUEST);
    }
  
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
