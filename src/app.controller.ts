import { Get, Controller, UseGuards, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthGuard } from './shared/guards/auth';
import { RoleEntity } from './entities/role.entity';
import { RoleEnum } from './shared/enums/role';

@ApiBearerAuth()
@Controller('api')
export class AppController {

  constructor(
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>,
  ) {}

  
  @Get()
  @UseGuards(AuthGuard)
  root() {
    return 'Api works';
  }

  @Get('seed')
  async seed() {
    const exist = await this.rolesRepository.findOne();
    if (exist) {
      return 'Roles exist';
    } else {
      await this.rolesRepository.insert([
        { role: RoleEnum.Admin },
        { role: RoleEnum.Operator },
        { role: RoleEnum.User },
      ]);
      

      return 'Roles Created';
    }
  }
}
