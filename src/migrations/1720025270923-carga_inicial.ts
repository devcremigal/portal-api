import { MigrationInterface, QueryRunner } from "typeorm";

export class CargaInicial1720025270923 implements MigrationInterface {
    name = 'CargaInicial1720025270923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`typeUser\` varchar(3) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`delivery_address\` (\`id\` int NOT NULL AUTO_INCREMENT, \`address\` varchar(255) NOT NULL, \`lat\` int NOT NULL, \`long\` int NOT NULL, \`postalCode\` varchar(20) NOT NULL, \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` datetime NOT NULL, \`time\` varchar(8) NOT NULL, \`deliveryDate\` datetime NOT NULL, \`obs\` varchar(100) NOT NULL, \`intObs\` varchar(100) NOT NULL, \`state\` int NOT NULL, \`userId\` int NULL, \`customerId\` int NULL, \`deliveryAddressId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`qty\` int NOT NULL, \`price\` int NOT NULL, \`total\` int NOT NULL, \`orderId\` int NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(15) NOT NULL, \`shortCode\` varchar(10) NOT NULL, \`barCode\` varchar(15) NOT NULL, \`description\` varchar(30) NOT NULL, \`unit\` varchar(2) NOT NULL, \`unit2\` varchar(2) NOT NULL, \`coef\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`price_table_item\` (\`priceTableCode\` varchar(3) NOT NULL, \`productId\` int NOT NULL, \`price\` int NOT NULL, PRIMARY KEY (\`priceTableCode\`, \`productId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`price_table\` (\`code\` varchar(3) NOT NULL, \`name\` varchar(40) NOT NULL, PRIMARY KEY (\`code\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(6) NOT NULL, \`branch\` varchar(2) NOT NULL, \`name\` varchar(50) NOT NULL, \`blocked\` tinyint NOT NULL, \`sellerCode\` varchar(6) NULL, \`priceTableCode\` varchar(3) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`seller\` (\`code\` varchar(6) NOT NULL, \`name\` varchar(40) NOT NULL, PRIMARY KEY (\`code\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`invoice\` (\`id\` int NOT NULL AUTO_INCREMENT, \`invoiceType\` varchar(3) NOT NULL, \`invoicePrefix\` varchar(3) NOT NULL, \`invoiceFee\` varchar(1) NOT NULL, \`invoiceNumber\` varchar(12) NOT NULL, \`originalValue\` int NOT NULL, \`balance\` int NOT NULL, \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment_invoice\` (\`id\` int NOT NULL AUTO_INCREMENT, \`paymentValue\` int NOT NULL, \`paymentReceiptId\` int NULL, \`invoiceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`type_payment\` (\`code\` varchar(2) NOT NULL, \`description\` varchar(30) NOT NULL, PRIMARY KEY (\`code\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment_value\` (\`id\` int NOT NULL AUTO_INCREMENT, \`number\` varchar(12) NOT NULL, \`value\` int NOT NULL, \`createDate\` datetime NOT NULL, \`expirationDate\` datetime NOT NULL, \`bankCode\` varchar(3) NOT NULL, \`bankBranch\` varchar(5) NOT NULL, \`bankAccount\` varchar(10) NOT NULL, \`chkScan\` varchar(31) NOT NULL, \`chkBank\` varchar(3) NOT NULL, \`chkBranch\` varchar(5) NOT NULL, \`chkAccount\` varchar(10) NOT NULL, \`chkIdCuit\` int NOT NULL, \`ckkIdDNI\` int NOT NULL, \`obs\` varchar(100) NOT NULL, \`paymentReceiptId\` int NULL, \`typePaymentCode\` varchar(2) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment_receipt\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` datetime NOT NULL, \`time\` varchar(8) NOT NULL, \`state\` int NOT NULL, \`obs\` varchar(100) NOT NULL, \`userId\` int NULL, \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`delivery_address\` ADD CONSTRAINT \`FK_f7dc9ec1ffbd464cc022c37e2d5\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_124456e637cca7a415897dce659\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_08fcc4e8c5af1570909f08f5029\` FOREIGN KEY (\`deliveryAddressId\`) REFERENCES \`delivery_address\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_646bf9ece6f45dbe41c203e06e0\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_904370c093ceea4369659a3c810\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`price_table_item\` ADD CONSTRAINT \`FK_d108f7c2530e6d34fb998f78f73\` FOREIGN KEY (\`priceTableCode\`) REFERENCES \`price_table\`(\`code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`price_table_item\` ADD CONSTRAINT \`FK_8ff260c8a335cee8fb68f3d41ac\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_7f17553781b82d2cad1edf6fb19\` FOREIGN KEY (\`sellerCode\`) REFERENCES \`seller\`(\`code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_aba0e4c0ee03e1c5e8d2600cc02\` FOREIGN KEY (\`priceTableCode\`) REFERENCES \`price_table\`(\`code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD CONSTRAINT \`FK_925aa26ea12c28a6adb614445ee\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment_invoice\` ADD CONSTRAINT \`FK_3a7d140968c8a31b6d016b64095\` FOREIGN KEY (\`paymentReceiptId\`) REFERENCES \`payment_receipt\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment_invoice\` ADD CONSTRAINT \`FK_40f530be9e67b4a9b2efa7fd235\` FOREIGN KEY (\`invoiceId\`) REFERENCES \`invoice\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment_value\` ADD CONSTRAINT \`FK_f916cec8909246af9ecdebf1d4e\` FOREIGN KEY (\`paymentReceiptId\`) REFERENCES \`payment_receipt\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment_value\` ADD CONSTRAINT \`FK_86ef736fa28ace1c3f0f49f66d3\` FOREIGN KEY (\`typePaymentCode\`) REFERENCES \`type_payment\`(\`code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment_receipt\` ADD CONSTRAINT \`FK_943d41d2e1999baaa06244598cb\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment_receipt\` ADD CONSTRAINT \`FK_4b80c2f88ac094726db394ffeaf\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_receipt\` DROP FOREIGN KEY \`FK_4b80c2f88ac094726db394ffeaf\``);
        await queryRunner.query(`ALTER TABLE \`payment_receipt\` DROP FOREIGN KEY \`FK_943d41d2e1999baaa06244598cb\``);
        await queryRunner.query(`ALTER TABLE \`payment_value\` DROP FOREIGN KEY \`FK_86ef736fa28ace1c3f0f49f66d3\``);
        await queryRunner.query(`ALTER TABLE \`payment_value\` DROP FOREIGN KEY \`FK_f916cec8909246af9ecdebf1d4e\``);
        await queryRunner.query(`ALTER TABLE \`payment_invoice\` DROP FOREIGN KEY \`FK_40f530be9e67b4a9b2efa7fd235\``);
        await queryRunner.query(`ALTER TABLE \`payment_invoice\` DROP FOREIGN KEY \`FK_3a7d140968c8a31b6d016b64095\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP FOREIGN KEY \`FK_925aa26ea12c28a6adb614445ee\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_aba0e4c0ee03e1c5e8d2600cc02\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_7f17553781b82d2cad1edf6fb19\``);
        await queryRunner.query(`ALTER TABLE \`price_table_item\` DROP FOREIGN KEY \`FK_8ff260c8a335cee8fb68f3d41ac\``);
        await queryRunner.query(`ALTER TABLE \`price_table_item\` DROP FOREIGN KEY \`FK_d108f7c2530e6d34fb998f78f73\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_904370c093ceea4369659a3c810\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_646bf9ece6f45dbe41c203e06e0\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_08fcc4e8c5af1570909f08f5029\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_124456e637cca7a415897dce659\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`ALTER TABLE \`delivery_address\` DROP FOREIGN KEY \`FK_f7dc9ec1ffbd464cc022c37e2d5\``);
        await queryRunner.query(`DROP TABLE \`payment_receipt\``);
        await queryRunner.query(`DROP TABLE \`payment_value\``);
        await queryRunner.query(`DROP TABLE \`type_payment\``);
        await queryRunner.query(`DROP TABLE \`payment_invoice\``);
        await queryRunner.query(`DROP TABLE \`invoice\``);
        await queryRunner.query(`DROP TABLE \`seller\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
        await queryRunner.query(`DROP TABLE \`price_table\``);
        await queryRunner.query(`DROP TABLE \`price_table_item\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`order_item\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`delivery_address\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
