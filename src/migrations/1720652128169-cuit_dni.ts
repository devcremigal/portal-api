import { MigrationInterface, QueryRunner } from "typeorm";

export class CuitDni1720652128169 implements MigrationInterface {
    name = 'CuitDni1720652128169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_value\` DROP COLUMN \`chkIdCuit\``);
        await queryRunner.query(`ALTER TABLE \`payment_value\` ADD \`chkIdCuit\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_value\` DROP COLUMN \`chkIdDNI\``);
        await queryRunner.query(`ALTER TABLE \`payment_value\` ADD \`chkIdDNI\` bigint NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_value\` DROP COLUMN \`chkIdDNI\``);
        await queryRunner.query(`ALTER TABLE \`payment_value\` ADD \`chkIdDNI\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_value\` DROP COLUMN \`chkIdCuit\``);
        await queryRunner.query(`ALTER TABLE \`payment_value\` ADD \`chkIdCuit\` int NOT NULL`);
    }

}
