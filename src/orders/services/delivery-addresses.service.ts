import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryAddress } from '../entities/delivery-address.entity';
import {
  CreateDeliveryAddressDto,
  UpdateDeliveryAddressDto,
} from '../dtos/delivery-address.dto';

@Injectable()
export class DeliveryAddressesService {
  constructor(
    @InjectRepository(DeliveryAddress)
    private deliveryAddressRepo: Repository<DeliveryAddress>,
  ) {}

  async create(data: CreateDeliveryAddressDto) {
    const deliveryAddress = this.deliveryAddressRepo.create(data);
    return this.deliveryAddressRepo.save(deliveryAddress);
  }

  findAll() {
    return this.deliveryAddressRepo.find({ relations: ['customer'] });
  }

  async findOne(id: number) {
    const deliveryAddress = await this.deliveryAddressRepo.findOne({
      where: { id },
      relations: ['customer'],
    });
    if (!deliveryAddress) {
      throw new NotFoundException(
        `Dirección de entrega con ID ${id} no encontrada`,
      );
    }
    return deliveryAddress;
  }

  async update(id: number, changes: UpdateDeliveryAddressDto) {
    const deliveryAddress = await this.findOne(id);
    this.deliveryAddressRepo.merge(deliveryAddress, changes);
    return this.deliveryAddressRepo.save(deliveryAddress);
  }

  async remove(id: number) {
    const deliveryAddress = await this.findOne(id);
    return this.deliveryAddressRepo.remove(deliveryAddress);
  }
}
