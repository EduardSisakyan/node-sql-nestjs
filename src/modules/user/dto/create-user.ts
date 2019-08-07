import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDTO {

  @ApiModelProperty()
  @MinLength(6)
  username: string;

  @ApiModelProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiModelProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiModelProperty()
  @IsEmail()
  email: string;

  @ApiModelProperty()
  @MinLength(6)
  password: string;
}
