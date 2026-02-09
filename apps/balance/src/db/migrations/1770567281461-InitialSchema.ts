import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1770567281461 implements MigrationInterface {
  name = 'InitialSchema1770567281461';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "asset" ("id" SERIAL NOT NULL, "search_id" character varying NOT NULL, "name" character varying NOT NULL, "symbol" character varying NOT NULL, CONSTRAINT "UQ_70c7d9dc37027e0ed326eaf939f" UNIQUE ("search_id"), CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "balance" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "asset_id" integer NOT NULL, "amount" numeric(18,8) NOT NULL, CONSTRAINT "PK_079dddd31a81672e8143a649ca0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "balance" ADD CONSTRAINT "FK_7d8cc22f3f813ce146e741e7ff4" FOREIGN KEY ("asset_id") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "balance" DROP CONSTRAINT "FK_7d8cc22f3f813ce146e741e7ff4"`,
    );
    await queryRunner.query(`DROP TABLE "balance"`);
    await queryRunner.query(`DROP TABLE "asset"`);
  }
}
