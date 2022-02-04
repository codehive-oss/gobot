import { MigrationInterface, QueryRunner } from "typeorm";

export class GobotMigration1642418719513 implements MigrationInterface {
  name = "GobotMigration1642418719513";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temp_penalty" ("id" SERIAL NOT NULL, "userID" character varying NOT NULL, "guildID" character varying NOT NULL, "reason" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_43033ee91b3432c304191acdd3c" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "temp_penalty"`);
  }
}
