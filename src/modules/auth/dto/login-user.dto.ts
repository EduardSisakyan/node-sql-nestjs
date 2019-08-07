import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class LoginUserDto {

  @IsNotEmpty()
  @ApiModelProperty()
  @Expose()
  username: string;

  @IsNotEmpty()
  @ApiModelProperty()
  @Expose()
  password: string;
}
