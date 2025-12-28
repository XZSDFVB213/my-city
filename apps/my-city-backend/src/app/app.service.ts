import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello wq' };
  }
  getTest(){
    return { message: 'Hello иди нахуй уебише' };
  }
}
