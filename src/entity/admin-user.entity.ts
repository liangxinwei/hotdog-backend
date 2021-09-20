import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdminUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account: string;
}
