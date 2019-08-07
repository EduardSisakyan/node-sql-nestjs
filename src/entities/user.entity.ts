import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, AfterLoad, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
import * as crypto from 'crypto';
import { Exclude } from 'class-transformer';

import { RoleEnum } from '../shared/enums/role';
import { RoleEntity } from './role.entity';

@Entity('user')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  @IsEmail()
  email: string;

  @ManyToMany(type => RoleEntity, role => role.users, { cascade: true, eager: true })
  @JoinTable()
  roles: (RoleEntity | RoleEnum)[];

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn({ type: 'datetime' })
  createdDt: Date;

  @CreateDateColumn()
  @UpdateDateColumn({ type: 'datetime' })
  updatedDt: Date;

  @Exclude()
  private passwordTmp: string;

  @BeforeInsert()
  private preCreate() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @BeforeUpdate()
  private preUpdate() {
    if (this.password !== this.passwordTmp) {
      this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }
  }

  @AfterLoad()
  private setPasswordTmp() {
    this.passwordTmp = this.password;
  }
}
