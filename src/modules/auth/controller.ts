import { Post, Controller, Body } from '@nestjs/common';

import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthFacade } from './facade';

@ApiBearerAuth()
@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(
    private authFacade: AuthFacade,
  ) {}


  @Post('login')
  async login(@Body() loginUserDto: LoginUserDTO) {
    return await this.authFacade.generateJWT(loginUserDto);
  }
}
