// src/appointments/dto/time-slots-request.dto.ts

import { IsDateString, IsNotEmpty } from 'class-validator';

export class TimeSlotsRequestDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;
}
