import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseFilters,
  UseInterceptors,
  UsePipes
} from '@nestjs/common';

import { AppService } from '../services/app.service';
import { GetInvestigations, PostInvestigationUpload } from '../docs/doc.decarators';
import { HttpExceptionFilter, InvestigationSearchRequestDto } from '@server/core';
import { AppControllerValidationPipe } from '../pipes/validation-pipe.app.controller';
import { FilesInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import StorageDiskStrategy from '../strategies/storage.strategy';
import { Investigation } from '../entities/investigation.entity';

/**
 *  * @todo create constants route for options, constants, like schema options.
 */
@UsePipes(
  AppControllerValidationPipe
)
@Controller('/investigation')
@UseFilters(HttpExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', Number.MAX_SAFE_INTEGER, {
      fileFilter: (req: any, file: any, cb: any) => {
        if (file && file.mimetype.match(/\/(csv|text\/csv|)$/)) {
          return cb(null, true);
        }
        return cb(new BadRequestException('Csv file is required.'), false);
      },
      storage: multer.diskStorage({
        ...StorageDiskStrategy
      })
    })
  )
  @PostInvestigationUpload()
  investigationUpload(
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return this.appService.investigationUpload(files);
  }

  @Get()
  @GetInvestigations()
  getInvestigations(@Query() query: InvestigationSearchRequestDto): Promise<Investigation[]> {
    return this.appService.findInvestigations(query);
  }
}
