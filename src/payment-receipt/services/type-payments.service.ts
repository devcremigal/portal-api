import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypePayment } from '../entities/type-payment.entity';
import {
  CreateTypePaymentDto,
  UpdateTypePaymentDto,
} from '../dtos/type-payment.dto';

@Injectable()
export class TypePaymentsService {
  constructor(
    @InjectRepository(TypePayment)
    private typePaymentRepo: Repository<TypePayment>,
  ) {}

  async create(data: CreateTypePaymentDto) {
    const typePayment = this.typePaymentRepo.create(data);
    return this.typePaymentRepo.save(typePayment);
  }

  findAll() {
    return this.typePaymentRepo.find();
  }

  async findOne(code: string) {
    const typePayment = await this.typePaymentRepo.findOne({ where: { code } });
    if (!typePayment) {
      throw new NotFoundException(
        `Tipo de pago con código ${code} no encontrado`,
      );
    }
    return typePayment;
  }

  async update(code: string, changes: UpdateTypePaymentDto) {
    const typePayment = await this.findOne(code);
    this.typePaymentRepo.merge(typePayment, changes);
    return this.typePaymentRepo.save(typePayment);
  }

  async remove(code: string) {
    const typePayment = await this.findOne(code);
    return this.typePaymentRepo.remove(typePayment);
  }
}
