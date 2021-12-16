import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity';
import { ResponseStatus } from 'src/sdks';
import { encryptPassword } from 'src/shared';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminUserService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * JWT验证 2: 校验用户信息
   * @param account
   * @param password
   */
  async validateAdminUser(account: string, password: string): Promise<User> {
    const user = await this.adminUserService.findOne(account);
    if (!user) {
      throw new HttpException('用户不存在', ResponseStatus.USER_NOT_EXISTED);
    }

    const hashedPassword = user.passwd;
    const salt = user.passwdSalt;
    const hashPassword = encryptPassword(password, salt);
    if (hashPassword !== hashedPassword) {
      throw new HttpException('密码错误', ResponseStatus.PASSWORD_ERROR);
    }

    return user;
  }

  /**
   * JWT验证 3：处理 jwt 签证
   */
  async certificate(user: any): Promise<{
    token: string;
  }> {
    const payload = {
      account: user.account,
      sub: user.id,
    };

    try {
      const token = this.jwtService.sign(payload);
      return {
        token,
      };
    } catch (error) {
      throw new HttpException('账号或密码错误', ResponseStatus.PASSWORD_ERROR);
    }
  }
}
