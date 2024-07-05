import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';

import { CreateOrderDto } from '../dtos/order.dto';

import { CustomersService } from 'src/users/services/customers.service';
import { DeliveryAddressesService } from './delivery-addresses.service';
import { ProductsService } from './products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private deliveryAddressService: DeliveryAddressesService,
    private customerService: CustomersService,
    private productService: ProductsService,
  ) {}

  async create(data: CreateOrderDto) {
    const customer = await this.customerService.findOne(data.customerId);
    const deliveryAddress = await this.deliveryAddressService.findOne(
      data.deliveryAddressId,
    );

    const order = new Order();
    order.date = data.date;
    order.customer = customer;
    order.deliveryAddress = deliveryAddress;

    const orderItems = [];
    for (const item of data.orderItems) {
      const product = await this.productService.findOne(item.productId);
      const orderItem = new OrderItem();
      orderItem.product = product;
      orderItem.qty = item.quantity;
      orderItems.push(orderItem);
    }

    order.orderItems = orderItems;
    return this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find({
      relations: ['orderItems', 'orderItems.product'],
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['orderItems', 'orderItems.product'],
    });
    if (!order) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }
    return order;
  }

  async update(id: number, changes: CreateOrderDto) {
    const order = await this.findOne(id);

    if (changes.customerId) {
      order.customer = await this.customerService.findOne(id);
    }

    if (changes.deliveryAddressId) {
      order.deliveryAddress = await this.deliveryAddressService.findOne(
        changes.deliveryAddressId,
      );
    }

    if (changes.orderItems && changes.orderItems.length > 0) {
      const orderItems = [];

      for (const item of changes.orderItems) {
        const product = await this.productService.findOne(item.productId);
        const orderItem = new OrderItem();
        orderItem.product = product;
        orderItem.qty = item.quantity;
        orderItem.price = item.price;
        orderItem.total = item.total;
        orderItems.push(orderItem);
      }
      order.orderItems = orderItems;
    }

    Object.assign(order, changes);
    return this.orderRepo.save(order);
  }

  remove(id: number) {
    return this.orderRepo.delete(id);
  }
}
