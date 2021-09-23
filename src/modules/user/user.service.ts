import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pick } from 'lodash';
import { Response, ResponseStatus } from 'src/constants';
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

  async findOne(account: string): Promise<Response<User | undefined>> {
    try {
      const adminUser = await this.userService.findOne({ account });

      if (adminUser) {
        return {
          code: HttpStatus.OK,
          data: adminUser,
        };
      } else {
        return {
          code: HttpStatus.NOT_FOUND,
          msg: '查无此人',
        };
      }
    } catch (error) {
      return {
        code: HttpStatus.SERVICE_UNAVAILABLE,
        msg: `Service error: ${error}`,
      };
    }
  }

  async register(body: CreateUser): Promise<Response<User | undefined>> {
    if (body.password !== body.rePassword) {
      return {
        code: ResponseStatus.PASSWORD_ERROR,
        msg: '两次密码输入不一致',
      };
    }

    const { data: adminUser } = await this.findOne(body.account);
    if (adminUser) {
      return {
        code: ResponseStatus.ADMIN_USER_EXISTED,
        msg: '用户已存在',
      };
    }

    const salt = makeSalt();
    const hashPwd = encryptPassword(body.password, salt);
    try {
      const newAdminUser = await this.userService.save({
        ...pick(body, ['passwd', 'passwdSalt']),
        passwd: hashPwd,
        passwdSalt: salt,
      });

      return {
        code: HttpStatus.OK,
        data: newAdminUser,
      };
    } catch (error) {
      return {
        code: HttpStatus.SERVICE_UNAVAILABLE,
        msg: `Service error: ${error}`,
      };
    }
  }
}
