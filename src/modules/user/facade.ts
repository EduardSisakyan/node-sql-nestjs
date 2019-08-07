import { Injectable } from '@nestjs/common';

import { UserService } from './service';
import { CreateUserDTO } from './dto/create-user';

import { FindOneParamsDTO } from './dto/find-one-params';

@Injectable()
export class UserFacade {

  constructor(
    private userService: UserService,
  ) {}

  async findAll() {
    return await this.userService.findAll();
  }

  async create(createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto);
  }

  async delete(params: FindOneParamsDTO) {
    return await this.userService.delete(params.id);
  }
}
