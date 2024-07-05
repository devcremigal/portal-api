import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceTable } from '../entities/price-table.entity';
import {
  CreatePriceTableDto,
  UpdatePriceTableDto,
} from '../dtos/price-table.dto';

@Injectable()
export class PriceTableService {
  constructor(
    @InjectRepository(PriceTable)
    private priceTableRepo: Repository<PriceTable>,
  ) {}

  async create(data: CreatePriceTableDto) {
    const priceTable = this.priceTableRepo.create(data);
    return this.priceTableRepo.save(priceTable);
  }

  findAll() {
    return this.priceTableRepo.find({
      relations: ['customers', 'priceTableItems'],
    });
  }

  async findOne(code: string) {
    const priceTable = await this.priceTableRepo.findOne({
      where: { code },
      relations: ['customers', 'priceTableItems'],
    });
    if (!priceTable) {
      throw new NotFoundException(
        `Tabla de precios con código ${code} no encontrada`,
      );
    }
    return priceTable;
  }

  async update(code: string, changes: UpdatePriceTableDto) {
    const priceTable = await this.findOne(code);
    this.priceTableRepo.merge(priceTable, changes);
    return this.priceTableRepo.save(priceTable);
  }

  async remove(code: string) {
    const priceTable = await this.findOne(code);
    return this.priceTableRepo.remove(priceTable);
  }
}
