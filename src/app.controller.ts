import { Controller, Get, Req, Redirect, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

const sleep = (delay = 3000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('success');
    }, delay);
  });
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/resources/:id')
  findOne(@Param() params) {
    return `This action returns a ${params.id} cat`;
  }

  @Get('/resources')
  async findAll() {
    await sleep();
    return Array(10)
      .fill('')
      .map((v, i) => ({ value: i + 1, label: `label_${i}` }));
  }

  @Get('/direct')
  @Redirect()
  redirect() {
    return { url: 'https://docs.nestjs.com/v5/' };
  }
}
