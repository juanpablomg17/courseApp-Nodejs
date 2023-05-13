import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import config from 'src/config/config';
import { ConfigType } from '@nestjs/config';
import 'dotenv/config';
import { Users } from '../infrastucture/repository/user/user.model'
import { Courses } from '../infrastucture/repository/course/course.model'
import { dataSourceOptions} from './data-source';


@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? process.env.API_KEY_PROD : process.env.API_KEY
    },
  ],
  exports: [
    'API_KEY', TypeOrmModule,
  ],
})
export class DataBaseModule { }
