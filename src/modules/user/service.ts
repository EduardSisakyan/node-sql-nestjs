import { Injectable } from '@nestjs/common';
import { validate }   from 'class-validator';

import { CreateUserDto } from './dto/create-user';
import { CustomException } from '../../shared/models/custom-exception';
import { UserRepository } from './repository';

@Injectable()
export class UserService {

  constructor(
    private userRepository: UserRepository,
  ) {}

  public async findAll() {
    return await this.userRepository.find();
  }

  public async create(createUserDto: CreateUserDto) {
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

  public async delete(id: number) {
    return await this.userRepository.deleteOrFail(id);
  }
}
