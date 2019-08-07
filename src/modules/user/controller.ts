import { Get, Post, Delete, Param, Controller, Body, UseGuards, ClassSerializerInterceptor, UseInterceptors, SerializeOptions } from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user';

import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../../shared/guards/auth';
import { UserEntity } from '../../entities/user.entity';
import { User } from '../../shared/decorators/user';
import { FindOneParamsDTO } from './dto/find-one-params';
import { UserFacade } from './facade';
import { UserPreviewDTO } from './dto/user-preview';
import { plainToClass } from 'class-transformer';

@ApiBearerAuth()
@ApiUseTags('user')
@Controller('users')
export class UserController {

  constructor(
    private userFacade: UserFacade,
  ) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async findMe(@User() user: UserEntity) {
    return plainToClass(UserPreviewDTO, user);
  }

  @Get('all')
  async allUsers() {
    return await this.userFacade.findAll();
  }

  @Post('create')
  async create(@Body() createUserDto: CreateUserDTO) {
    return this.userFacade.create(createUserDto);
  }

  @Delete('delete/:id')
  async delete(@Param() params: FindOneParamsDTO) {
    return await this.userFacade.delete(params);
  }
}
