import { Exclude, Transform, Expose } from 'class-transformer';

import { RoleEnum } from '../../../shared/enums/role';
import { RoleEntity } from '../../../entities/role.entity';

@Exclude()
export class UserPreviewDTO {

  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  @Transform((value: RoleEntity[]) => (value || []).map(x => x.role), { toPlainOnly: true })
  roles: RoleEnum[];
}
