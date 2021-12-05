import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Allow, IsEnum, IsOptional } from 'class-validator';
import { eventTypes } from '@server/core';

export class InvestigationSearchResponseDto {
  @ApiProperty({
    enum: eventTypes
  })
  @IsOptional()
  @Allow()
  readonly eventType: eventTypes;

  @ApiPropertyOptional()
  @IsOptional()
  @Allow()
  readonly deviceName: string;

  @ApiProperty()
  @IsOptional()
  @Allow()
  readonly userName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Allow()
  readonly tags: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @Allow()
  readonly data: string;

  @ApiProperty()
  @Allow()
  readonly createdAt: Date;

  @ApiProperty()
  @Allow()
  readonly date: Date;
}
