import { Test } from '@nestjs/testing';
import 'multer';
import { AppService } from '../app.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getRepositoryToken } from "@nestjs/typeorm";
import { Investigation } from "../../entities/investigation.entity";
import { mockedMongoFunctions } from "../../entities/tests/entity.mock.spec";
import { eventTypes } from "@server/core";
import { Readable } from "stream";
import { EventNames } from "../../types";

const mockRequest = {
  startDate: new Date(),
  endDate: new Date(),
  eventType: eventTypes.eventRecordCreated,
  deviceName: 'Random String',
  userName: 'Random String',
  tags: ['Random String'],
  data: 'Random String',
};
const mockRequestMongoQuery = {
  "where": {
    "data": {
      "$options": "i",
      "$regex": mockRequest.data,
    },
    "date": {
      "$gt": mockRequest.startDate,
      "$lte": mockRequest.endDate,
    },
    "deviceName": mockRequest.deviceName,
    "eventType": mockRequest.eventType,
    "tags": {
      "$in": mockRequest.tags,
      "$size": mockRequest.tags.length,
    },
    "userName": mockRequest.userName,
  }
}
const mockFindInvestigationResponse = {
  "_id": "61ad021559995a007a0c4a18",
  "eventType": "eventRecordCreated",
  "deviceName": "İçerik 13-2",
  "userName": "İçerik 13-3",
  "tags": [
    "İçerik 13-4"
  ],
  "data": "İçerik 13-5",
  "date": "2021-12-05T18:16:53.356Z",
  "createdAt": "2021-12-05T18:16:53.356Z"
}
const mockEventEmitter = {
  emit: jest.fn().mockImplementation((event, value) => true)
}

const mockMongo = {
  ...mockedMongoFunctions,
  find: jest.fn().mockResolvedValue(mockFindInvestigationResponse)
}
describe('AppService', () => {
  let service: AppService;
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(Investigation),
          useValue: mockMongo,
        },
        {
          provide: EventEmitter2,
          useValue: mockEventEmitter
        }
      ]
    }).compile();

    service = app.get<AppService>(AppService);
  });
  describe('app service functions', () => {
    it('should find investigations', async () => {
      const res = await service.findInvestigations(mockRequest)
      expect(mockMongo.find).toHaveBeenCalledWith(mockRequestMongoQuery);
      expect(res).toStrictEqual(mockFindInvestigationResponse);
    });
    it('should send to event emitter uploaded file paths', async () => {
      const csvFilename = `${Date.now()}_${Math.random().toString(16).substring(5)}.csv`;
      const file = {
        fieldname: csvFilename,
        originalname: csvFilename,
        encoding: 'utf-8',
        mimetype: 'text/csv',
        size: 12345,
        stream: Readable.from('12345'),
        destination: csvFilename,
        filename: csvFilename,
        path: csvFilename,
        buffer: Buffer.from('12345'),
      }

      const res = await service.investigationUpload([file])
      expect(mockEventEmitter.emit).toHaveBeenCalledWith(EventNames.InvestigationFilesUploaded, [file.path]);
      expect(res).toStrictEqual({ count: 1 });
    });
  });
});
