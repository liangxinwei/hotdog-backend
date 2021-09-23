import { Body, Controller, Post } from '@nestjs/common';
import { CreateUser } from 'src/dto';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('find')
  async findUser(@Body() body: any) {
    return this.userService.findOne(body.account);
  }

  @Post('register')
  async register(@Body() body: CreateUser) {
    return await this.userService.register(body);
  }
}
