import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDecimal1720045214434 implements MigrationInterface {
    name = 'ChangeDecimal1720045214434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`delivery_address\` DROP COLUMN \`lat\``);
        await queryRunner.query(`ALTER TABLE \`delivery_address\` ADD \`lat\` decimal(10,6) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`delivery_address\` DROP COLUMN \`long\``);
        await queryRunner.query(`ALTER TABLE \`delivery_address\` ADD \`long\` decimal(10,6) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP COLUMN \`qty\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD \`qty\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD \`price\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD \`total\` decimal(14,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`price_table_item\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`price_table_item\` ADD \`price\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP COLUMN \`originalValue\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD \`originalValue\` decimal(18,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP COLUMN \`balance\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD \`balance\` decimal(18,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_invoice\` DROP COLUMN \`paymentValue\``);
        await queryRunner.query(`ALTER TABLE \`payment_invoice\` ADD \`paymentValue\` decimal(18,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_value\` DROP COLUMN \`value\``);
        await queryRunner.query(`ALTER TABLE \`payment_value\` ADD \`value\` decimal(18,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_value\` DROP COLUMN \`value\``);
        await queryRunner.query(`ALTER TABLE \`payment_value\` ADD \`value\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_invoice\` DROP COLUMN \`paymentValue\``);
        await queryRunner.query(`ALTER TABLE \`payment_invoice\` ADD \`paymentValue\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP COLUMN \`balance\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD \`balance\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP COLUMN \`originalValue\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD \`originalValue\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`price_table_item\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`price_table_item\` ADD \`price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD \`total\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD \`price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP COLUMN \`qty\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD \`qty\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`delivery_address\` DROP COLUMN \`long\``);
        await queryRunner.query(`ALTER TABLE \`delivery_address\` ADD \`long\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`delivery_address\` DROP COLUMN \`lat\``);
        await queryRunner.query(`ALTER TABLE \`delivery_address\` ADD \`lat\` int NOT NULL`);
    }

}
