import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from 'src/users/users.module';

import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { DeliveryAddress } from './entities/delivery-address.entity';
import { PriceTable } from './entities/price-table.entity';
import { PriceTableItem } from './entities/price-table-item.entity';
import { Product } from './entities/product.entity';
import { DeliveryAddressesService } from './services/delivery-addresses.service';
import { DeliveryAddressesController } from './controllers/delivery-addresses.controller';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { PriceTableService } from './services/price-table.service';
import { PriceTableController } from './controllers/price-table.controller';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([
      DeliveryAddress,
      Order,
      OrderItem,
      PriceTable,
      PriceTableItem,
      Product,
    ]),
  ],
  controllers: [
    OrdersController,
    DeliveryAddressesController,
    ProductsController,
    PriceTableController,
  ],
  providers: [
    OrdersService,
    DeliveryAddressesService,
    ProductsService,
    PriceTableService,
  ],
})
export class OrdersModule {}
