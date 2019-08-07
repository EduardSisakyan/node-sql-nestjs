import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { UserService } from './service';
import { CreateUserDTO } from './dto/create-user';

import { FindOneParamsDTO } from './dto/find-one-params';
import { UserPreviewDTO } from './dto/user-preview';
import { UsersFilterDTO } from './dto/user-filter';

@Injectable()
export class UserFacade {

  constructor(
    private userService: UserService,
  ) {}

  async findAll(usersFilterDTO: UsersFilterDTO) {
    const data = await this.userService.findAll(usersFilterDTO);
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
