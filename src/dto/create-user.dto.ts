import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '账户' })
  @IsNotEmpty()
  readonly account: string;

  @ApiProperty({ description: '用户名' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty()
  readonly passwd: string;

  @ApiProperty({ description: '确认密码' })
  @IsNotEmpty()
  readonly rePasswd: string;

  @ApiProperty({ description: '手机号' })
  readonly tel?: string;
}
