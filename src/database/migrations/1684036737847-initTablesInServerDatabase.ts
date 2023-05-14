import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTablesInServerDatabase1684036737847 implements MigrationInterface {
    name = 'InitTablesInServerDatabase1684036737847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courses" ("id" character varying NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_6ba1a54849ae17832337a39d5e5" UNIQUE ("name"), CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "fullname" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "studyschedule" ("id" character varying NOT NULL, "useremail" character varying(255) NOT NULL, "coursename" character varying(255) NOT NULL, "completecourse" boolean NOT NULL, "courseorder" bigint NOT NULL, "userId" character varying, "courseId" character varying, CONSTRAINT "PK_231eb05d982f98ac42c6f7043c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "studyschedule" ADD CONSTRAINT "FK_5699b8a7c72c62787792050e4d3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "studyschedule" ADD CONSTRAINT "FK_4b9063de6886edb3f2499b6f238" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "studyschedule" DROP CONSTRAINT "FK_4b9063de6886edb3f2499b6f238"`);
        await queryRunner.query(`ALTER TABLE "studyschedule" DROP CONSTRAINT "FK_5699b8a7c72c62787792050e4d3"`);
        await queryRunner.query(`DROP TABLE "studyschedule"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "courses"`);
    }

}
