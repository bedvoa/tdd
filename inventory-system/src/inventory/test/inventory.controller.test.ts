import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from '../inventory.controller';
import { InventoryService } from '../inventory.service';
import { InventoryRepository } from '../repository/inventory.repository';

describe('InventoryController', () => {
  let inventoryController: InventoryController;
  let inventoryService: InventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [
        InventoryService,
        {
          provide: InventoryRepository,
          useValue: {
            addInventory: jest.fn(),
          },
        },
      ],
    }).compile();

    inventoryController = module.get<InventoryController>(InventoryController);
    inventoryService = module.get<InventoryService>(InventoryService);
  });

  it('should be defined', () => {
    expect(inventoryController).toBeDefined();
  });
});
