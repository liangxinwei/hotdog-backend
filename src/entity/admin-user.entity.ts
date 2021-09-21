import { AdminUserStatusEnum, RoleEnum } from 'src/sdks';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdminUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  passwordSalt: string;

  @Column()
  tel: string;

  @Column({
    default: RoleEnum.Readonly,
  })
  role: RoleEnum;

  @Column({
    default: AdminUserStatusEnum.Effective,
  })
  status: AdminUserStatusEnum;

  @Column({
    default: 0,
  })
  createdBy: number;

  @Column()
  createdAt: string;

  @Column({
    default: 0,
  })
  updatedBy: number;

  @Column()
  updatedAt: string;
}
