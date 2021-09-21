import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pick } from 'lodash';
import { Response, ResponseStatus } from 'src/constants';
import { CreateAdminUser } from 'src/dto';
import { AdminUser } from 'src/entity';
import { encryptPassword, makeSalt } from 'src/shared';
import { Repository } from 'typeorm';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: Repository<AdminUser>,
  ) {}

  async findOne(account: string): Promise<Response<AdminUser | undefined>> {
    try {
      const adminUser = await this.adminUserRepository.findOne({ account });

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

  async register(body: CreateAdminUser): Promise<Response<AdminUser | undefined>> {
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
      const newAdminUser = await this.adminUserRepository.save({
        ...pick(body, ['password', 'rePassword']),
        password: hashPwd,
        passwordSalt: salt,
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
