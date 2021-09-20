import { Body, Controller, Post } from '@nestjs/common';
import { AdminUserService } from './admin-user.service';

@Controller('user')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Post('find')
  async findUser(@Body() body: any) {
    return this.adminUserService.findAdminUser(body.username);
  }
}
