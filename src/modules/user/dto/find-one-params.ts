
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class FindOneParamsDTO {
  
  @ApiModelProperty()
  @IsNumberString()
  id: number;
}
