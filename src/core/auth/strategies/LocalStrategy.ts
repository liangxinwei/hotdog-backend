import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(account: string, password: string): Promise<any> {
    const { data: adminUser } = await this.authService.validateAdminUser(account, password);
    if (!adminUser) {
      throw new UnauthorizedException();
    }

    return adminUser;
  }
}
