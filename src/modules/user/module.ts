import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controller';
import { UserService } from './service';
import { UserRepository } from './repository';
import { UserFacade } from './facade';
import { RoleEntity } from '../../entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ RoleEntity ]),
    TypeOrmModule.forFeature([ UserRepository ]),
  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserService,
    UserFacade,
  ],
  exports: [
    UserService,
  ],
})
export class UserModule {}
