import { HttpModule } from '@nestjs/axios';import {
    Module,
    ValidationPipe,
    MiddlewareConsumer,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import 'dotenv/config';

import { DomainModule } from '../domain/domain.module';
import { InfrastructureModule } from '../infrastucture/infrastucture.module';
import { CommandHandlers } from './cqrs/command-handler';
import { QueryHandlers } from './cqrs/query-handler';
import { UseCases } from './use-case/use-cases';


import { Controllers } from './controllers/controller';
// import { CourseController } from './controllers/course/course.controller';
@Module({
    imports: [
        CqrsModule,
        InfrastructureModule,
        DomainModule,
        HttpModule,
    ],
    controllers: [...Controllers],
    providers: [
        ...UseCases,
        ...CommandHandlers,
        ...QueryHandlers,
        
    ],
})
export class ApplicationModule  {}
