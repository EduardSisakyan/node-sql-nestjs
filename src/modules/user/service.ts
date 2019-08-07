import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

import { CreateUserDTO } from './dto/create-user';
import { UserRepository } from './repository';
import { UsersFilterDTO } from './dto/user-filter';

@Injectable()
export class UserService {

  constructor(
    private userRepository: UserRepository,
  ) {}

  public async findAll() {
    return await this.userRepository.find();
  }

  public async create(createUserDto: CreateUserDTO) {
    const newUser = this.userRepository.createModel();
    newUser.username = createUserDto.username;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    newUser.firstName = createUserDto.firstName;
    newUser.lastName = createUserDto.lastName;

    await this.userRepository.validateOrFail(newUser);

    const savedUser = await this.userRepository.save(newUser);
    return savedUser;
  }

  public async findOne(filter: UsersFilterDTO) {

    if (filter.password) {
      filter.password = crypto.createHmac('sha256', filter.password).digest('hex');
    }
    return await this.userRepository.findOne(filter);
  }

  public async delete(id: number) {
    return await this.userRepository.deleteOrFail(id);
  }
}
