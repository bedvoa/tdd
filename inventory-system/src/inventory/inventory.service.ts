import { InventoryRepository } from './repository/inventory.repository';
import { Injectable } from '@nestjs/common';
import { Inventory } from './dto/inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  findByItemId(itemId: string): Inventory {
    return null;
  }
}
