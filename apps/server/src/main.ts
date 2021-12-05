import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { version } from '../../../package.json';
import { ResponseWrapperInterceptor } from '@server/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'v0';
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new ResponseWrapperInterceptor());
  const port = process.env.PORT || 3333;

  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME)
    .setDescription(`${process.env.APP_NAME} App Description`)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const documentationPath = 'documentation';
  SwaggerModule.setup(documentationPath, app, document);

  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`);
    Logger.log(`Documentation at http://localhost:${port}/${documentationPath}`);
  });
}

bootstrap();
