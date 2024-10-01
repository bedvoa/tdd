import { IInventoryService } from './interface/inventory-service.interface';
import { InventoryRepository } from './repository/inventory.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryService implements IInventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async findByItemId(itemId: string) {
    // 아이템이 정상적으로 존재하는 경우
    const item = await this.inventoryRepository.findByItemId(itemId);

    if (item) {
      return item;
    }

    return null;
  }
}
