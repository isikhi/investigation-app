import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventNames } from '../../types';
import { Investigation } from '../../entities/investigation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { investigationCsvParser } from "../../converters";

@Injectable()
export class InvestigationImportListener {
  constructor(
    @InjectRepository(Investigation) private readonly investigationRepository: Repository<Investigation>,
  ) {
  }

  @OnEvent(EventNames.InvestigationFilesUploaded, { async: true })
  async handleInvestigationFileUploads(paths: string[]) {
    try {
      const insertPromises = [];
      for (const path of paths) {
        const entities = await investigationCsvParser(path)
        const investigationRepository = this.investigationRepository.manager.getMongoRepository(Investigation)
        insertPromises.push(investigationRepository.insertMany(entities));
      }
      Promise.allSettled(insertPromises).then((results) => {
        results.forEach((result, index) => {
          if (result.status === 'rejected') {
            Logger.error(`Investigation ${paths[index]} cannot saved to database. Reason: ${result.reason}`);
          }
        });
      });
    } catch (e) {
      Logger.error(`Event: ${EventNames.InvestigationFilesUploaded}`, e.stack, InvestigationImportListener.name);
    }
  }
}
