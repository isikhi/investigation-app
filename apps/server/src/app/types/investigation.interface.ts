import { eventTypes } from '@server/core';

export interface InvestigationInterface {
  eventType: eventTypes
  deviceName: string
  userName: string
  tags: string[]
  data: any[]
  date: Date
}
