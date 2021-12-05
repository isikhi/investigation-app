import {Test, TestingModule} from '@nestjs/testing';

import {AppController} from '../app.controller';
import {AppService} from '../../services/app.service';

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
const mockGetInvestigationRequest = {
  startDate: new Date(),
  endDate: new Date(),
}
const mockInvestigationService = {
  investigationUpload: jest.fn().mockResolvedValue({count: 1}),
  findInvestigations: jest.fn().mockResolvedValue(mockFindInvestigationResponse)
}
describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{
        provide: AppService,
        useValue: mockInvestigationService
      }]
    }).compile();
  });
  describe('App Controller', () => {
    it('should be defined', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController).toBeDefined();
    });
    it('should be defined', async () => {
      const appController = app.get<AppController>(AppController);
      const foundInvestigations = await appController.getInvestigations(mockGetInvestigationRequest)
      expect(foundInvestigations).toBeDefined();
      expect(mockInvestigationService.findInvestigations).toHaveBeenCalledTimes(1)
      expect(foundInvestigations).toStrictEqual(mockFindInvestigationResponse);
    });
  });
});
