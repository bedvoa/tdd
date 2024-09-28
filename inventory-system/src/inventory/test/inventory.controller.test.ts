import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from '../inventory.controller';
import { InventoryService } from '../inventory.service';
import { InventoryRepository } from '../repository/inventory.repository';

describe('InventoryController', () => {
  let controller: InventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [InventoryService, InventoryRepository],
    }).compile();

    controller = module.get<InventoryController>(InventoryController);
  });
});
