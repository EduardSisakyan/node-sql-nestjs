import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as jwt from 'jsonwebtoken';

import { ApplicationModule } from './app.module';
import { UserEntity } from './entities/user.entity';
import { getRepository } from 'typeorm';
import { Config } from './shared/helpers/config';
import { ValidationPipe } from './shared/pipes/validation.pipe';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(ApplicationModule, appOptions);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  app.use(async(req, res, next) => {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.toString();
      const userInfo: any = jwt.verify(token, Config.SECRET_KEY);
      const user = await getRepository(UserEntity).findOne(userInfo.id);
  
      if (user) {
        req.user = user;
      }
    }
    return next();
  });

  const options = new DocumentBuilder()
    .setTitle('Node js')
    .setDescription('description')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(3000);
}
bootstrap();
