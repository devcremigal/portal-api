import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';

import { CreateOrderDto } from '../dtos/order.dto';

import { UsersService } from 'src/users/services/users.service';
import { CustomersService } from 'src/users/services/customers.service';
import { DeliveryAddressesService } from './delivery-addresses.service';
import { ProductsService } from './products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    private userService: UsersService,
    private customerService: CustomersService,
    private deliveryAddressService: DeliveryAddressesService,
    private productService: ProductsService,
  ) {}

  async create(data: CreateOrderDto) {
    const user = await this.userService.findOne(data.userId);
    const customer = await this.customerService.findOne(data.customerId);
    const deliveryAddress = await this.deliveryAddressService.findOne(
      data.deliveryAddressId,
    );

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const order = new Order();
    order.date = data.date;
    order.user = user;
    order.time = `${hours}:${minutes}:${seconds}`;
    order.customer = customer;
    order.deliveryDate = data.deliveryDate;
    order.deliveryAddress = deliveryAddress;
    order.obs = data.obs;
    order.state = 1;
    order.intObs = data.intObs;

    const savedOrder = await this.orderRepo.save(order);

    const orderItems = [];
    for (const item of data.orderItems) {
      const product = await this.productService.findOne(item.productId);
      const orderItem = new OrderItem();
      orderItem.product = product;
      orderItem.qty = item.quantity;
      orderItem.price = item.price;
      orderItem.total = item.total;
      orderItem.order = savedOrder;
      orderItems.push(orderItem);
    }

    await this.orderItemRepo.save(orderItems); // Guardar los orderItems

    return savedOrder;
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
      order.customer = await this.customerService.findOne(changes.customerId);
    }

    if (changes.deliveryAddressId) {
      order.deliveryAddress = await this.deliveryAddressService.findOne(
        changes.deliveryAddressId,
      );
    }

    Object.assign(order, changes);
    const savedOrder = await this.orderRepo.save(order);

    if (changes.orderItems && changes.orderItems.length > 0) {
      // Eliminar los antiguos orderItems
      await this.orderItemRepo.delete({ order: { id: savedOrder.id } });

      const orderItems = [];

      for (const item of changes.orderItems) {
        const product = await this.productService.findOne(item.productId);
        const orderItem = new OrderItem();
        orderItem.product = product;
        orderItem.qty = item.quantity;
        orderItem.price = item.price;
        orderItem.total = item.total;
        orderItem.order = savedOrder;
        orderItems.push(orderItem);
      }
      changes.orderItems = orderItems;
      await this.orderItemRepo.save(orderItems); // Guardar los orderItems
    }

    return savedOrder;
  }

  remove(id: number) {
    return this.orderRepo.delete(id);
  }
}
