import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Seller } from '../entities/seller.entity';
import { PriceTable } from '../../orders/entities/price-table.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(Seller) private sellerRepo: Repository<Seller>,
    @InjectRepository(PriceTable)
    private priceTableRepo: Repository<PriceTable>,
  ) {}

  async create(data: CreateCustomerDto) {
    const seller = await this.sellerRepo.findOne({
      where: { code: data.sellerCode },
    });
    if (!seller) {
      throw new NotFoundException(
        `No se encontro el siguiente vendedor: ${data.sellerCode}`,
      );
    }

    const priceTable = await this.priceTableRepo.findOne({
      where: { code: data.priceTableCode },
    });
    if (!priceTable) {
      throw new NotFoundException(
        `No se encontro la siguiente lista de precio: ${data.priceTableCode}`,
      );
    }

    const customer = this.customerRepo.create({
      ...data,
      seller,
      priceTable,
    });

    return this.customerRepo.save(customer);
  }

  findAll() {
    return this.customerRepo.find({ relations: ['seller', 'priceTable'] });
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne({
      where: { id },
      relations: ['seller', 'priceTable'],
    });
    if (!customer) {
      throw new NotFoundException(`No se encontro el cliente con el id ${id}`);
    }
    return customer;
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.findOne(id);

    if (changes.sellerCode) {
      const seller = await this.sellerRepo.findOne({
        where: { code: changes.sellerCode },
      });
      if (!seller) {
        throw new NotFoundException(
          `No se encontro el siguiente vendedor: ${changes.sellerCode}`,
        );
      }
      customer.seller = seller;
    }

    if (changes.priceTableCode) {
      const priceTable = await this.priceTableRepo.findOne({
        where: { code: changes.priceTableCode },
      });
      if (!priceTable) {
        throw new NotFoundException(
          `No se encontro la siguiente lista de precio:  ${changes.priceTableCode}`,
        );
      }
      customer.priceTable = priceTable;
    }

    this.customerRepo.merge(customer, changes);
    return this.customerRepo.save(customer);
  }

  remove(id: number) {
    return this.customerRepo.delete(id);
  }
}
