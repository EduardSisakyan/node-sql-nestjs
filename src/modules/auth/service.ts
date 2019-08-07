import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { Config } from '../../shared/helpers/config';
import { UserEntity } from '../../entities/user.entity';


@Injectable()
export class AuthService {

  constructor() {}

  public async generateJwt(user: UserEntity) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id       : user.id,
      username : user.username,
      email    : user.email,
      exp      : exp.getTime() / 1000,
    }, Config.SECRET_KEY);
  }
}
