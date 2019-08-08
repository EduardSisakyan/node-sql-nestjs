import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

import { RoleEnum } from '../shared/enums/role';
import { UserEntity } from './user.entity';

@Entity('roles')
export class RoleEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  role: RoleEnum;

  @ManyToMany(type => UserEntity, user => user.roles)
  users: UserEntity[];
}
