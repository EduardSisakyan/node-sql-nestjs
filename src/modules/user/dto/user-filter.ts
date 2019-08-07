import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UsersFilterDTO {

  @Expose()
  username?: string;

  @Expose()
  firstName?: string;

  @Expose()
  lastName?: string;

  @Expose()
  email?: string;

  @Expose()
  password?: string;
}
