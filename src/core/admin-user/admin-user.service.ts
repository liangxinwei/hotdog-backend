import { Injectable } from '@nestjs/common';
import { AdminUserEntity } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUserEntity)
    private readonly adminUserRepository: Repository<AdminUserEntity>,
  ) {}

  async findAdminUser(account: string): Promise<AdminUserEntity | undefined> {
    return this.adminUserRepository.findOne(account);
  }
}
