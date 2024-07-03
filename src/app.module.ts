import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './utils/database/database.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentReceiptModule } from './payment-receipt/payment-receipt.module';

import { enviroments } from './enviroments';
import { ConfigModule } from '@nestjs/config';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    OrdersModule,
    PaymentReceiptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
