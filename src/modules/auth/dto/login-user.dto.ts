import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class LoginUserDTO {

  @IsNotEmpty()
  @ApiModelProperty()
  @Expose()
  username: string;

  @IsNotEmpty()
  @ApiModelProperty()
  @Expose()
  password: string;
}
