import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../entity/inventory.entity';
import { IInventoryRepository } from '../interface/inventory-repository.interface';

@Injectable()
export class InventoryRepository implements IInventoryRepository {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  async findByItemId(itemId: string) {
    return await this.inventoryRepository.findOne({ where: { itemId } });
  }

  async addInventory(itemId: string, stock: number) {
    return await this.inventoryRepository.save({ itemId, stock });
  }

  async decreaseByItemId(itemId: string, stock: number): Promise<any> {
    return await this.inventoryRepository.save({ itemId, stock });
  }
}
