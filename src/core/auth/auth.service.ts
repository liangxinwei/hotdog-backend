import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from 'src/shared';

import { ResponseStatus } from '../../constants';
import { AdminUserService } from '../admin-user/admin-user.service';

@Injectable()
export class AuthService {
  constructor(private readonly adminUserService: AdminUserService, private readonly jwtService: JwtService) {}

  /**
   * JWT验证 2: 校验用户信息
   * @param account
   * @param password
   */
  async validateAdminUser(account: string, password: string) {
    const { data: adminUser } = await this.adminUserService.findOne(account);
    if (adminUser) {
      const hashedPassword = adminUser.passwd;
      const salt = adminUser.passwdSalt;
      const hashPassword = encryptPassword(password, salt);
      if (hashPassword === hashedPassword) {
        return {
          code: HttpStatus.OK,
          data: adminUser,
        };
      } else {
        return {
          code: ResponseStatus.PASSWORD_ERROR,
          msg: '密码错误',
        };
      }
    }

    return {
      code: HttpStatus.NOT_FOUND,
      msg: '查无此人',
    };
  }

  /**
   * JWT验证 3：处理 jwt 签证
   */
  async certificate(user: any) {
    const payload = { account: user.account, id: user.id, name: user.name, role: user.role };

    try {
      const token = this.jwtService.sign(payload);
      return {
        code: HttpStatus.OK,
        data: {
          token,
        },
      };
    } catch (error) {
      return {
        code: 600,
        msg: `账号或密码错误`,
      };
    }
  }
}
