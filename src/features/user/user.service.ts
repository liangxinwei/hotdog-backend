import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';
import { CreateUserDto } from 'src/dto';
import { User } from 'src/entity';
import { ResponseStatus } from 'src/sdks';
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

  async checkRegisteredUser(createUserDto: CreateUserDto) {
    const user = await this.findOne(createUserDto.account);
    if (user) {
      throw new HttpException('用户已存在', ResponseStatus.USER_EXISTED);
    }
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.passwd !== createUserDto.rePasswd) {
      throw new HttpException(
        '两次密码输入不一致',
        ResponseStatus.PASSWORD_ERROR,
      );
    }

    await this.checkRegisteredUser(createUserDto);

    const salt = makeSalt();
    const hashPwd = encryptPassword(createUserDto.passwd, salt);
    return await this.userService.save({
      ...omit(createUserDto, ['passwd', 'passwdSalt']),
      passwd: hashPwd,
      passwdSalt: salt,
    });
  }
}
