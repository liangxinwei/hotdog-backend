import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pick } from 'lodash';
import { ResponseStatus } from 'src/constants';
import { CreateUser } from 'src/dto';
import { User } from 'src/entity';
import { encryptPassword, makeSalt } from 'src/shared';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userService: Repository<User>,
  ) {}

  async findOne(account: string): Promise<User> {
    return await this.userService.findOne({ account });
  }

  async register(body: CreateUser): Promise<User> {
    if (body.passwd !== body.rePasswd) {
      throw new HttpException(
        '两次密码输入不一致',
        ResponseStatus.PASSWORD_ERROR,
      );
    }

    const user = await this.findOne(body.account);
    if (user) {
      throw new HttpException('用户已存在', ResponseStatus.USER_EXISTED);
    }

    const salt = makeSalt();
    const hashPwd = encryptPassword(body.passwd, salt);
    return await this.userService.save({
      ...pick(body, ['passwd', 'passwdSalt']),
      passwd: hashPwd,
      passwdSalt: salt,
    });
  }
}
