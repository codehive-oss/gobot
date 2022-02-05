import { MigrationInterface, QueryRunner } from "typeorm";

export class GobotMigration1640542128019 implements MigrationInterface {
  name = "GobotMigration1640542128019";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "go_server" ("id" character varying NOT NULL, "prefix" character varying NOT NULL DEFAULT 'go ', "nsfw" boolean NOT NULL DEFAULT false, "anime" boolean NOT NULL DEFAULT false, "welcomechannel" character varying, CONSTRAINT "PK_f5657d1b2dee77cfca2fd094b41" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "go_user" ("id" character varying NOT NULL, "accessToken" character varying, "handBalance" integer NOT NULL DEFAULT '0', "bankBalance" integer NOT NULL DEFAULT '0', "xp" integer NOT NULL DEFAULT '0', "messages" integer NOT NULL DEFAULT '0', "items" integer array NOT NULL DEFAULT '{0,0,0,0,0,0,0}', "tools" integer array NOT NULL DEFAULT '{0}', CONSTRAINT "PK_14c0f68e174aacee65a813c4c60" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reaction_role_message" ("messageid" character varying NOT NULL, "roleid" character varying NOT NULL, "emoji" character varying NOT NULL, CONSTRAINT "PK_50c0551c0efe9dbec242eb2fda2" PRIMARY KEY ("messageid"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "reaction_role_message"`);
    await queryRunner.query(`DROP TABLE "go_user"`);
    await queryRunner.query(`DROP TABLE "go_server"`);
  }
}
