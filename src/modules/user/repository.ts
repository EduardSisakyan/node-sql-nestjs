import { EntityRepository, Not, IsNull } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { BaseRepository } from '../../shared/base/repository';
import { CustomException } from '../../shared/models/custom-exception';


@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {

  public async validateOrFail(entity: UserEntity) {
    await super.validateOrFail(entity);

    const existUser = await this.findOne({
      username: entity.username,
      id: Not(entity.id || IsNull()),
    });
    if (existUser) {
      throw new CustomException('Username must be unique.');
    }

    return true;
  }
}
