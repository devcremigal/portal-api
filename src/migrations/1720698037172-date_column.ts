import { MigrationInterface, QueryRunner } from "typeorm";

export class DateColumn1720698037172 implements MigrationInterface {
    name = 'DateColumn1720698037172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`date\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`deliveryDate\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`deliveryDate\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_value\` DROP COLUMN \`createDate\``);
        await queryRunner.query(`ALTER TABLE \`payment_value\` ADD \`createDate\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_value\` DROP COLUMN \`expirationDate\``);
        await queryRunner.query(`ALTER TABLE \`payment_value\` ADD \`expirationDate\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_receipt\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`payment_receipt\` ADD \`date\` date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_receipt\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`payment_receipt\` ADD \`date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_value\` DROP COLUMN \`expirationDate\``);
        await queryRunner.query(`ALTER TABLE \`payment_value\` ADD \`expirationDate\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_value\` DROP COLUMN \`createDate\``);
        await queryRunner.query(`ALTER TABLE \`payment_value\` ADD \`createDate\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`deliveryDate\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`deliveryDate\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`date\` datetime NOT NULL`);
    }

}
