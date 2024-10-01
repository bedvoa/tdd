import { IInventoryService } from './interface/inventory-service.interface';
import { InventoryRepository } from './repository/inventory.repository';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class InventoryService implements IInventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async findByItemId(itemId: string) {
    try {
      // 아이템이 정상적으로 존재하는 경우
      const item = await this.inventoryRepository.findByItemId(itemId);

      if (!item) {
        return null;
      }

      return item;
    } catch (error) {
      throw error;
    }
  }

  async decreaseByItemId(itemId: string, quantity: number) {
    try {
      if (quantity < 0) {
        throw new BadRequestException('구매 수량은 음수일 수 없습니다.');
      }

      const item = await this.inventoryRepository.findByItemId(itemId);
      if (!item) {
        return null;
      }

      if (item.stock < quantity) {
        return null;
      }

      await this.inventoryRepository.decreaseByItemId(
        itemId,
        item.stock - quantity,
      );

      return true;
    } catch (error) {
      throw error;
    }
  }
}
