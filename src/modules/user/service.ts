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

  public async findAll(filter?: UsersFilterDTO) {

    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role');

    if (filter) {
      if (filter.ids.length) {
        query.where(`user.id = (:...ids)`, { ids: filter.ids });
      }

      if (filter.firstName) {
        query.where(`user.firstName LIKE :firstName`, { firstName: `%${filter.firstName}%` });
      }

      if (filter.lastName) {
        query.where(`user.lastName LIKE :lastName`, { lastName: `%${filter.lastName}%` });
      }

      if (filter.username) {
        query.where(`user.username LIKE :username`, { username: `%${filter.username}%` });
      }

      if (filter.email) {
        query.where(`user.email LIKE :email`, { email: `%${filter.email}%` });
      }

      if (filter.roles.length) {
        query.where(`role.role IN (:...roles)`, { roles: filter.roles });
      }
    }
    return await query
      .getMany();
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
