import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
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
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new NotFoundException('这个用户不存在。');
    }

    return user;
  }

  async findOneByAccount(account: string) {
    const user = await this.userRepository.findOne({ account });

    if (!user) {
      throw new NotFoundException('这个用户不存在');
    }

    return user;
  }

  async checkRegisteredUser(createUserDto: CreateUserDto) {
    const user = await this.findOneByAccount(createUserDto.account);
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
    return await this.userRepository.save({
      ...omit(createUserDto, ['passwd', 'passwdSalt']),
      passwd: hashPwd,
      passwdSalt: salt,
    });
  }
}
