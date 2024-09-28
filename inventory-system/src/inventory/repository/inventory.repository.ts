import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from '../dto/inventory.dto';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryRepository {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  addInventory(itemId: string, stock: number) {
    return this.inventoryRepository.save({ itemId, stock });
  }
}
