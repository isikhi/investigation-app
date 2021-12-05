import {Injectable, InternalServerErrorException, Logger} from '@nestjs/common';
import {EventNames} from '../types';
import {EventEmitter2} from '@nestjs/event-emitter';
import {Investigation} from '../entities/investigation.entity';
import {InvestigationSearchRequestDto} from '@server/core';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    private eventEmitter: EventEmitter2,
    @InjectRepository(Investigation) private readonly investigationRepository: Repository<Investigation>
  ) {
  }

  async investigationUpload(files: Array<Express.Multer.File>) {
    try {
      const paths: string[] = files.map(e => e.path);
      this.eventEmitter.emit(EventNames.InvestigationFilesUploaded, paths);
      return {count: paths.length};
    } catch (e) {
      Logger.error('An error occurred while investigation upload', e.stack, AppService.name);
      throw new InternalServerErrorException('An error occurred investigation upload.');
    }
  }

  async findInvestigations(query: InvestigationSearchRequestDto): Promise<Investigation[]> {
    try {
      const {startDate, endDate, ...restOfQuery} = query;
      const _query = {
        ...restOfQuery,
        ...(query.data && {data: {$regex: query.data, $options: 'i'}}),
        ...(query.tags && query.tags.length && {tags: {'$size': query.tags.length, '$in': query.tags}}),
        date: {
          $gt: startDate,
          $lte: endDate
        }
      };
      return await this.investigationRepository.find({where: _query});
    } catch (e) {
      Logger.error('An error occurred while find investigation.', e.stack, AppService.name);
      throw new InternalServerErrorException('An error occurred while find investigation.');
    }
  }
}
