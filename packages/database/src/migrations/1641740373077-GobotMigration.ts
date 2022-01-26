import { MigrationInterface, QueryRunner } from "typeorm";

export class GobotMigration1641740373077 implements MigrationInterface {
  name = "GobotMigration1641740373077";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reaction_role_message" DROP CONSTRAINT "PK_50c0551c0efe9dbec242eb2fda2"`
    );
    await queryRunner.query(
      `ALTER TABLE "reaction_role_message" DROP COLUMN "messageid"`
    );
    await queryRunner.query(
      `ALTER TABLE "reaction_role_message" DROP COLUMN "roleid"`
    );
    await queryRunner.query(
      `ALTER TABLE "reaction_role_message" ADD "id" SERIAL NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "reaction_role_message" ADD CONSTRAINT "PK_cc3ec0133779c8bb9937a5445a2" PRIMARY KEY ("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "reaction_role_message" ADD "messageID" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "reaction_role_message" ADD "roleID" character varying NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reaction_role_message" DROP COLUMN "roleID"`
    );
    await queryRunner.query(
      `ALTER TABLE "reaction_role_message" DROP COLUMN "messageID"`
    );
    await queryRunner.query(
      `ALTER TABLE "reaction_role_message" DROP CONSTRAINT "PK_cc3ec0133779c8bb9937a5445a2"`
    );
    await queryRunner.query(
      `ALTER TABLE "reaction_role_message" DROP COLUMN "id"`
    );
    await queryRunner.query(
      `ALTER TABLE "reaction_role_message" ADD "roleid" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "reaction_role_message" ADD "messageid" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "reaction_role_message" ADD CONSTRAINT "PK_50c0551c0efe9dbec242eb2fda2" PRIMARY KEY ("messageid")`
    );
  }
}
