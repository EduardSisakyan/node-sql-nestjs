import { Injectable } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

import { Config } from '../../shared/helpers/config';
import { LoginUserDto } from './dto/login-user.dto';
import { CustomException } from '../../shared/models/custom-exception';
import { UserService } from '../user/service';

@Injectable()
export class AuthFacade {

  constructor(
    private userService: UserService,
  ) {}

  public async generateJWT(loginUserDto: LoginUserDto) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    const user = await this.userService.findOne({
      username : loginUserDto.username,
      password : loginUserDto.password,
    });

    if (!user) throw new CustomException('Username or password is incrorrect');

    const token = jwt.sign({
      id       : user.id,
      username : user.username,
      email    : user.email,
      exp      : exp.getTime() / 1000,
    }, Config.SECRET_KEY);

    return { token };
  }
}
