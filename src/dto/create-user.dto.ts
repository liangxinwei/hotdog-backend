import { IsNotEmpty } from 'class-validator';

export class CreateUser {
  @IsNotEmpty()
  readonly account: string;

  readonly name?: string;

  @IsNotEmpty()
  readonly passwd: string;

  @IsNotEmpty()
  readonly rePasswd: string;

  readonly tel?: string;
}
