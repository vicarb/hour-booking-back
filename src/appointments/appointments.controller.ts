// src/appointments/appointments.controller.ts
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { TimeSlotsRequestDto } from './dto/time-slots-request.dto/time-slots-request.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto/create-appointment.dto';


import { Appointment } from './schemas/appointment.schema';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  async findAll(): Promise<Appointment[]> {
    return this.appointmentsService.findAll();
  }

  @Get('time-slots')
  async getTimeSlots(@Query() timeSlotsRequestDto: TimeSlotsRequestDto) {
    console.log(timeSlotsRequestDto);
    return await this.appointmentsService.getTimeSlots(timeSlotsRequestDto.date, timeSlotsRequestDto.selectedService);
  }

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    return await this.appointmentsService.create(createAppointmentDto);
  }
}
