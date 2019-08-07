import { Module } from '@nestjs/common';

import { AuthController } from './controller';
import { AuthFacade } from './facade';
import { UserModule } from '../user/module';
import { AuthService } from './service';

@Module({
  imports: [
    UserModule
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthFacade,
    AuthService,
  ],
  exports: [
    AuthService
  ],
})
export class AuthModule {}
