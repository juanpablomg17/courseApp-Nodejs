import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import config from 'src/config/config';
import { ConfigType } from '@nestjs/config';
import 'dotenv/config';
import { Users } from '../infrastucture/repository/user/user.model'
import { Courses } from '../infrastucture/repository/course/course-model'


@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   inject: [config.KEY],
    //   useFactory: (configService: ConfigType<typeof config>) => ({
    //     type: 'postgres',
    //     host: configService.databaseHost,
    //     port: configService.databasePort,
    //     username: configService.databaseUserName,
    //     password: configService.databasePassword,
    //     database: configService.databaseName,
    //   }),
    // }),
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: '123456',
        database: 'coursedb',
        entities: [Users, Courses],
        synchronize: true
      }
    ),
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
