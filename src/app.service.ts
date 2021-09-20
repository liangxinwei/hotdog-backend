import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  main(): string {
    return 'welcome to hotdog';
  }
}
