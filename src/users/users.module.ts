import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './services/users.service';

import { UsersController } from './controllers/users.controller';

import { User } from './entities/user.entity';
import { Seller } from './entities/seller.entity';
import { Customer } from './entities/customer.entity';
import { PriceTable } from 'src/orders/entities/price-table.entity';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Seller, Customer, PriceTable])],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
