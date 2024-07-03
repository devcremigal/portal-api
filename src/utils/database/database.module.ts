import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbName, port, password, user, host } = configService.mysql;

        return {
          type: 'mysql',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: false,
          autoLoadEntities: true,
          entities: ['src/**/*.entity.js'],
        };
      },
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
