import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from '../entities/product.entity';
import { DeliveryAddress } from '../entities/delivery-address.entity';
import { Customer } from 'src/users/entities/customer.entity';

import { CreateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(DeliveryAddress)
    private deliveryAddressRepo: Repository<DeliveryAddress>,
  ) {}

  async create(data: CreateOrderDto) {
    const customer = await this.findCustomer(data.customerId);
    const deliveryAddress = await this.findDeliveryAddress(
      data.deliveryAddressId,
    );

    const order = new Order();
    order.date = data.date;
    order.customer = customer;
    order.deliveryAddress = deliveryAddress;

    const orderItems = [];
    for (const item of data.orderItems) {
      const product = await this.findProduct(item.productId);
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
      const customer = await this.findCustomer(changes.customerId);
      order.customer = customer;
    }

    if (changes.deliveryAddressId) {
      const deliveryAddress = await this.findDeliveryAddress(
        changes.deliveryAddressId,
      );
      order.deliveryAddress = deliveryAddress;
    }

    if (changes.orderItems && changes.orderItems.length > 0) {
      const orderItems = [];
      for (const item of changes.orderItems) {
        const product = await this.findProduct(item.productId);
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

  async findCustomer(id: number) {
    const customer = this.customerRepo.findOne({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado.`);
    }

    return customer;
  }

  async findDeliveryAddress(id: number) {
    const deliveryAddress = this.deliveryAddressRepo.findOne({
      where: { id },
    });

    if (!deliveryAddress) {
      throw new NotFoundException(
        `Direccion de entrega con ID ${id} no encontrado.`,
      );
    }

    return deliveryAddress;
  }

  async findProduct(id: number) {
    const product = this.productRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }

    return product;
  }
}
