import {  DataSource, DataSourceOptions } from 'typeorm' 
import 'dotenv/config';

import {Courses } from '../infrastucture/repository/course/course.model'
import { Users } from '../infrastucture/repository/user/user.model'



export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: ['dist/**/*.model.js'],
        synchronize: false,
        migrations: [process.env.TYPEORM_MIGRATIONS],
        migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME || 'migrations',
}



const dataSource = new DataSource(dataSourceOptions)

export default dataSource