import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { DeliveryAddress } from './entities/delivery-address.entity';
import { PriceTable } from './entities/price-table.entity';
import { PriceTableItem } from './entities/price-table-item.entity';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DeliveryAddress,
      Order,
      OrderItem,
      PriceTable,
      PriceTableItem,
      Product,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
