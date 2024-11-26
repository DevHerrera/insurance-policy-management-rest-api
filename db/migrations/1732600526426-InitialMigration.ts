import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1732600526426 implements MigrationInterface {
  name = 'InitialMigration1732600526426';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."insurance_policy_status_enum" AS ENUM('active', 'expired', 'canceled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "insurance_policy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "coverageAmount" double precision NOT NULL, "premium" double precision NOT NULL, "status" "public"."insurance_policy_status_enum" NOT NULL DEFAULT 'active', "companyId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_c4c50dbcf89b2b5c90e0cfda67d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "insurance_policy" ADD CONSTRAINT "FK_768b855027b51c8b7c1f7c393f6" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "insurance_policy" ADD CONSTRAINT "FK_a198d0a2cffbdc266379280ce76" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "insurance_policy" DROP CONSTRAINT "FK_a198d0a2cffbdc266379280ce76"`,
    );
    await queryRunner.query(
      `ALTER TABLE "insurance_policy" DROP CONSTRAINT "FK_768b855027b51c8b7c1f7c393f6"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`DROP TABLE "insurance_policy"`);
    await queryRunner.query(
      `DROP TYPE "public"."insurance_policy_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "company"`);
  }
}
