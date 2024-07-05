import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from '../entities/invoice.entity';
import { CreateInvoiceDto, UpdateInvoiceDto } from '../dtos/invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
  ) {}

  async create(data: CreateInvoiceDto) {
    const invoice = this.invoiceRepo.create(data);
    return this.invoiceRepo.save(invoice);
  }

  findAll() {
    return this.invoiceRepo.find({ relations: ['customer'] });
  }

  async findOne(id: number) {
    const invoice = await this.invoiceRepo.findOne({
      where: { id },
      relations: ['customer'],
    });
    if (!invoice) {
      throw new NotFoundException(`Factura con ID ${id} no encontrada`);
    }
    return invoice;
  }

  async update(id: number, changes: UpdateInvoiceDto) {
    const invoice = await this.findOne(id);
    this.invoiceRepo.merge(invoice, changes);
    return this.invoiceRepo.save(invoice);
  }

  async remove(id: number) {
    const invoice = await this.findOne(id);
    return this.invoiceRepo.remove(invoice);
  }

  async updateBalance(id: number, value: number) {
    const invoice = await this.findOne(id);
    invoice.balance -= value;
    await this.invoiceRepo.save(invoice);
  }
}
