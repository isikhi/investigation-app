import { ConfigModule, ConfigService } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Investigation } from './entities/investigation.entity';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestigationImportListener } from './events/listeners/investigation-import.listener';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mongodb',
          url: configService.get('MONGODB_URI'),
          entities: [Investigation],
          synchronize: configService.get('NODE_ENV') === 'development'
        };
      }
    }),
    TypeOrmModule.forFeature([Investigation]),
    EventEmitterModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, InvestigationImportListener]
})
export class AppModule {
}
