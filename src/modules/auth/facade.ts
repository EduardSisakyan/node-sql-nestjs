import { Injectable } from '@nestjs/common';


import { Config } from '../../shared/helpers/config';
import { LoginUserDTO } from './dto/login-user.dto';
import { CustomException } from '../../shared/models/custom-exception';
import { UserService } from '../user/service';
import { AuthService } from './service';

@Injectable()
export class AuthFacade {

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  public async generateJWT(loginUserDto: LoginUserDTO) {
    const user = await this.userService.findOne(loginUserDto);

    if (!user) {
      throw new CustomException('Username or password is incrorrect');
    }
    const token = await this.authService.generateJwt(user);

    return { token };
  }
}
