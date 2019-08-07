import { Injectable } from '@nestjs/common';

import { UserService } from './service';
import { CreateUserDTO } from './dto/create-user';

import { FindOneParamsDTO } from './dto/find-one-params';
import { plainToClass } from 'class-transformer';
import { UserPreviewDTO } from './dto/user-preview';

@Injectable()
export class UserFacade {

  constructor(
    private userService: UserService,
  ) {}

  async findAll() {
    const data = await this.userService.findAll();
    return plainToClass(UserPreviewDTO, data);
  }

  async create(createUserDto: CreateUserDTO) {
    const data = await this.userService.create(createUserDto);
    return plainToClass(UserPreviewDTO, data);
  }

  async delete(params: FindOneParamsDTO) {
    return await this.userService.delete(params.id);
  }
}
