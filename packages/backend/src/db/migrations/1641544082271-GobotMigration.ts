import {MigrationInterface, QueryRunner} from "typeorm";

export class GobotMigration1641544082271 implements MigrationInterface {
    name = 'GobotMigration1641544082271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // delete contents of old table
        await queryRunner.query(`DELETE FROM "reaction_role_message"`);
        
        await queryRunner.query(`ALTER TABLE "reaction_role_message" DROP CONSTRAINT "PK_50c0551c0efe9dbec242eb2fda2"`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" DROP COLUMN "messageid"`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" DROP COLUMN "roleid"`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" DROP COLUMN "emoji"`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" ADD "messageID" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" ADD CONSTRAINT "PK_3fdcf32ce8139fd69ef8155c58f" PRIMARY KEY ("messageID")`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" ADD "roleID" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" ADD "emojiID" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reaction_role_message" DROP COLUMN "emojiID"`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" DROP COLUMN "roleID"`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" DROP CONSTRAINT "PK_3fdcf32ce8139fd69ef8155c58f"`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" DROP COLUMN "messageID"`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" ADD "emoji" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" ADD "roleid" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" ADD "messageid" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" ADD CONSTRAINT "PK_50c0551c0efe9dbec242eb2fda2" PRIMARY KEY ("messageid")`);
    }

}
