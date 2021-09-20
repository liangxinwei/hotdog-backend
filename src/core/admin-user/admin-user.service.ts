import { Injectable } from '@nestjs/common';
import { AdminUser } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'src/constants';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: Repository<AdminUser>,
  ) {}

  async findOne(account: string): Promise<Response<AdminUser> | undefined> {
    try {
      const adminUser = await this.adminUserRepository.findOne({ account });

      if (adminUser) {
        return {
          code: 200,
          data: adminUser,
        };
      } else {
        return {
          code: 600,
          msg: '查无此人',
        };
      }
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
