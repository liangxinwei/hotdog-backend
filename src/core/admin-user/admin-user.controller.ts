import { Body, Controller, Post } from '@nestjs/common';
import { CreateAdminUser } from 'src/dto';

import { AdminUserService } from './admin-user.service';

@Controller('admin-user')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Post('find')
  async findUser(@Body() body: any) {
    return this.adminUserService.findOne(body.account);
  }

  @Post('register')
  async register(@Body() body: CreateAdminUser) {
    return await this.adminUserService.register(body);
  }
}
