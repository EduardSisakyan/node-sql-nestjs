import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

import { CreateUserDTO } from './dto/create-user';
import { UserRepository } from './repository';
import { UsersFilterDTO } from './dto/user-filter';
import { RoleEntity } from '../../entities/role.entity';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
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
    newUser.roles = await this.roleRepository.find({ role: In(createUserDto.roles) });

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
