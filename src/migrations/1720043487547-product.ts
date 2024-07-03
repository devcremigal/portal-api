import { MigrationInterface, QueryRunner } from "typeorm";

export class Product1720043487547 implements MigrationInterface {
    name = 'Product1720043487547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`shortCode\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`shortCode\` varchar(15) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`shortCode\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`shortCode\` varchar(10) NOT NULL`);
    }

}
