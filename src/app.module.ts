import { Module, ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';


import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastucture/infrastucture.module';
import { DataBaseModule } from './database/database.module';
import config from './config/config';
import { enviroments } from './config/environments';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: enviroments[process.env.NODE_ENV] || '.env',
            isGlobal: true,
            load: [config],
        }),
        ApplicationModule,
        InfrastructureModule,
        DataBaseModule,
    ],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
    ],
})
export class AppModule { 
    constructor(private dataSource: DataSource) {}
}
