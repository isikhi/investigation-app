import { Column, Entity, Index, ObjectID, ObjectIdColumn } from 'typeorm';
import { eventTypes } from '@server/core';
import { InvestigationInterface } from '../types/investigation.interface';

@Entity("Investigation")
export class Investigation implements InvestigationInterface {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ enum: eventTypes })
  eventType: eventTypes;

  @Index()
  @Column()
  deviceName: string;

  @Index()
  @Column()
  userName: string;

  @Column({ nullable: false })
  tags: string[];

  @Column({ nullable: false })
  data: any[];

  @Index()
  @Column()
  date: Date;

  @Column({ nullable: false, default: Date.now })
  createdAt: Date;
}
/** @todo: use weight system for indexing */
