import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Allow, IsDate, IsOptional } from 'class-validator';
import { eventTypes } from '@server/core';

export class InvestigationSearchRequestDto {
  @ApiProperty()
  @IsDate()
  @Allow()
  readonly startDate: Date;

  @ApiProperty()
  @IsDate()
  @Allow()
  readonly endDate: Date;

  @ApiPropertyOptional({
    enum: eventTypes,
  })
  @IsOptional()
  @Allow()
  readonly eventType?: eventTypes;

  @ApiPropertyOptional()
  @IsOptional()
  @Allow()
  readonly deviceName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Allow()
  readonly userName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Allow()
  readonly tags?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @Allow()
  readonly data?: string;
}
