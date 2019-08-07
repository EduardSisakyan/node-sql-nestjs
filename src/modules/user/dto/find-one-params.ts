
import { IsNumberString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class FindOneParamsDTO {
  
  @ApiModelProperty()
  @IsNumberString()
  id: number;
}
