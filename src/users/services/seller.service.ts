import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from '../entities/seller.entity';
import { CreateSellerDto, UpdateSellerDto } from '../dtos/seller.dto';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller) private sellerRepo: Repository<Seller>,
  ) {}

  create(data: CreateSellerDto) {
    const seller = this.sellerRepo.create(data);
    return this.sellerRepo.save(seller);
  }

  findAll() {
    return this.sellerRepo.find();
  }

  async findOne(code: string) {
    const seller = await this.sellerRepo.findOne({ where: { code } });
    if (!seller) {
      throw new NotFoundException(
        `No se encontro el vendedor con el codigo: ${code}`,
      );
    }
    return seller;
  }

  async update(code: string, changes: UpdateSellerDto) {
    const seller = await this.findOne(code);
    this.sellerRepo.merge(seller, changes);
    return this.sellerRepo.save(seller);
  }

  remove(code: string) {
    return this.sellerRepo.delete(code);
  }
}
