export interface UserData {
  name: string;
  age?: number;
  gender: number;
}

export declare type UserInfo = UserData & {
  uid: number;
}
