import { RoleEnum, UserStatusEnum } from 'src/sdks';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account: string;

  @Column()
  name: string;

  @Column()
  passwd: string;

  @Column()
  passwdSalt: string;

  @Column()
  tel: string;

  @Column({
    default: RoleEnum.Readonly,
  })
  role: RoleEnum;

  @Column({
    default: UserStatusEnum.Effective,
  })
  status: UserStatusEnum;

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
