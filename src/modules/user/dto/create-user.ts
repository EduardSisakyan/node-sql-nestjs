import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, IsNotEmpty, IsEnum } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

import { RoleEnum } from '../../../shared/enums/role';

@Exclude()
export class CreateUserDTO {

  @ApiModelProperty()
  @MinLength(6)
  @Expose()
  username: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @Expose()
  firstName: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @Expose()
  lastName: string;

  @ApiModelProperty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiModelProperty()
  @MinLength(6)
  @Expose()
  password: string;

  @ApiModelProperty()
  @IsEnum(RoleEnum, { each: true })
  @Expose()
  roles: RoleEnum[];
}
