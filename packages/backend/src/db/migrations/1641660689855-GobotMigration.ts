import {MigrationInterface, QueryRunner} from "typeorm";

export class GobotMigration1641660689855 implements MigrationInterface {
    name = 'GobotMigration1641660689855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "reaction_role_message"`);

        await queryRunner.query(`ALTER TABLE "reaction_role_message" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" DROP CONSTRAINT "PK_3fdcf32ce8139fd69ef8155c58f"`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" ADD CONSTRAINT "PK_3178564db22cd85f2203b79138c" PRIMARY KEY ("messageID", "id")`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" DROP CONSTRAINT "PK_3178564db22cd85f2203b79138c"`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" ADD CONSTRAINT "PK_cc3ec0133779c8bb9937a5445a2" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reaction_role_message" DROP CONSTRAINT "PK_cc3ec0133779c8bb9937a5445a2"`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" ADD CONSTRAINT "PK_3178564db22cd85f2203b79138c" PRIMARY KEY ("messageID", "id")`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" DROP CONSTRAINT "PK_3178564db22cd85f2203b79138c"`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" ADD CONSTRAINT "PK_3fdcf32ce8139fd69ef8155c58f" PRIMARY KEY ("messageID")`);
        await queryRunner.query(`ALTER TABLE "reaction_role_message" DROP COLUMN "id"`);
    }

}
