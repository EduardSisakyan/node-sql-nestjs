import { Module } from '@nestjs/common';

import { AuthController } from './controller';
import { AuthFacade } from './facade';
import { UserModule } from '../user/module';

@Module({
  imports: [
    UserModule
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthFacade,
  ],
  exports: [
  ],
})
export class AuthModule {}
