import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from '../domain/interface/IUser';
import { TypeOrmModule } from '@nestjs/typeorm'
import config from 'src/config/config';
import { ConfigType } from '@nestjs/config';
import 'dotenv/config';
import { UserRepository } from './repository/user/user-repository'
import { Users } from './repository/user/user.model'


@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    }
  ],
  exports: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    }
  ],
})
export class InfrastructureModule { }
