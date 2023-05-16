// src/appointments/appointments.controller.ts
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { TimeSlotsRequestDto } from './dto/time-slots-request.dto/time-slots-request.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto/create-appointment.dto';
import { GetUser } from '../auth/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../users/schemas/user.schema';

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

  @Get('my')
@UseGuards(JwtAuthGuard)
async getUserAppointments(@GetUser() user: User) {
  const appointments = await this.appointmentsService.findByUser(user.username);
  return { username: user.username, appointments };
}


  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    return await this.appointmentsService.create(createAppointmentDto);
  }

  
}
