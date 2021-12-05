import { InvestigationInterface } from '../types/investigation.interface';
import { plainToInstance, Transform } from 'class-transformer';
import { eventTypes } from '@server/core';

export class PlainCsvToInvestigationDTO implements InvestigationInterface {
  data: any[];

  @Transform(({ value }) => {
    const d = new Date(value)
    return isNaN(d && d.getTime()) ? new Date() : d;
  })
  date: Date;

  deviceName: string;

  eventType: eventTypes;

  @Transform(({ value }) => {
    const arrVal = value.split(',')
    return typeof arrVal === 'string' ? [arrVal] : arrVal
  })
  tags: string[];

  userName: string;

  createdAt: Date = new Date();

}
export const jsonToInvestigation = (json) => {
  return plainToInstance(PlainCsvToInvestigationDTO, json)
}
