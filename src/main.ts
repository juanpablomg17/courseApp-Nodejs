import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


function setupSwagger(contextPath: string, app: INestApplication) {
    const documentBuilder = new DocumentBuilder()
        .setTitle('api')
        .setDescription('The API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, documentBuilder);
    SwaggerModule.setup(contextPath, app, document);
}

async function boot() {
    const app = await NestFactory.create(AppModule);
    const contextPath = process.env.CONTEXT_PATH || 'api';
    const defaultPort = 5000;
    const port = process.env.PORT || defaultPort;
    app.setGlobalPrefix(contextPath).useGlobalPipes(new ValidationPipe());
    app.enableCors();
    setupSwagger(contextPath, app);
    await app.listen(port);
}

boot();
