import { Exclude, Expose } from 'class-transformer';
import { RoleEnum } from '../../../shared/enums/role';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { Default } from '../../../shared/decorators/default';

@Exclude()
export class UsersFilterDTO {

  @Expose()
  @ApiModelProperty()
  @IsString()
  @IsOptional()
  username?: string;

  @Expose()
  @ApiModelProperty()
  @IsString()
  @IsOptional()
  firstName?: string;

  @Expose()
  @ApiModelProperty()
  @IsString()
  @IsOptional()
  lastName?: string;

  @Expose()
  @ApiModelProperty()
  email?: string;

  @Expose()
  password?: string;

  @Expose()
  @ApiModelProperty()
  @IsOptional()
  @Default([])
  @IsEnum(RoleEnum, { each: true })
  roles?: RoleEnum[];
}
