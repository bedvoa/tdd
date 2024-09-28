import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './inventory/entity/inventory.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysql',
      database: 'tdd_db',
      entities: [Inventory],
      synchronize: true,
    }),
    InventoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
