import { MigrationInterface, QueryRunner } from "typeorm";

export class Product1720042963961 implements MigrationInterface {
    name = 'Product1720042963961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`boxesVal\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`boxesVal\``);
    }

}
