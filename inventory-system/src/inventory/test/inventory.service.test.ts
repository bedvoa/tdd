import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from '../inventory.service';
import { InventoryRepository } from '../repository/inventory.repository';

jest.mock('../repository/inventory.repository');

describe('InventoryService', () => {
  let inventoryService: InventoryService; // System Under Test
  let inventoryRepositoryMock: any;

  beforeEach(async () => {
    inventoryRepositoryMock = {
      addInventory: jest.fn(),
      findByItemId: jest.fn(),
      decreaseByItemId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryService,
        {
          provide: InventoryRepository,
          useValue: inventoryRepositoryMock,
        },
      ],
    }).compile();

    inventoryService = module.get<InventoryService>(InventoryService);
  });

  /** 재고 조회 */
  describe('FindByItemId - 재고 조회', () => {
    it('Case #1: 아이템이 없는 경우; itemId를 갖는 entity를 찾지 못하면, null을 반환', async () => {
      // given
      const nonExistingItemId = '2';

      // when
      const result = await inventoryService.findByItemId(nonExistingItemId);
      inventoryRepositoryMock.findByItemId.mockResolvedValueOnce(null);

      // then
      expect(result).toBeNull();
    });

    it('Case #2: 아이템이 정상적으로 존재하는 경우; itemId를 갖는 entity를 찾았다면, inventory를 반환', async () => {
      // given
      const existingItemId: string = '2';
      const quantity: number = 10;

      // when
      inventoryRepositoryMock.findByItemId.mockResolvedValueOnce({
        itemId: existingItemId,
        quantity,
      });
      const result = await inventoryService.findByItemId(existingItemId);

      // then
      expect(result).not.toBeNull();
      expect(result).toEqual({ itemId: existingItemId, quantity });
      expect(inventoryRepositoryMock.findByItemId).toHaveBeenCalledTimes(1);
    });
  });

  /** 재고 감소 */
  describe('DecreaseByItemId - 재고 감소', () => {
    it('Case #1: 구매 수량이 음수인 경우; quantity가 음수라면, Exception을 throw한다.', async () => {
      // given
      const itemId: string = '1';
      const quantity = -1;

      // then
      await expect(
        inventoryService.decreaseByItemId(itemId, quantity),
      ).rejects.toThrow('구매 수량은 음수일 수 없습니다.');
    });

    it('Case #2: 아이템이 없는 경우; itemId를 갖는 entity를 찾지 못하면, Exception을 throw한다.', async () => {
      // given
      const nonExistingItemId: string = '2';

      // when
      inventoryRepositoryMock.findByItemId.mockResolvedValueOnce(null);
      const result = await inventoryService.decreaseByItemId(
        nonExistingItemId,
        10,
      );

      // then
      expect(result).toBeNull();
    });

    it('Case #3: 구매 수량이 잔여 수량 보다 클 경우; quantity가 stock보다 크면, Exception을 throw한다.', async () => {
      // given
      const itemId: string = '1';
      const quantity = 10;
      const stock = 5;

      // when
      inventoryRepositoryMock.findByItemId.mockResolvedValueOnce({
        itemId,
        stock,
      });
      const result = await inventoryService.decreaseByItemId(itemId, quantity);

      // then
      expect(result).toBeNull();
    });

    it('itemId를 갖는 entity를 찾았다면, stock을 차감하고 inventory를 반화', async () => {
      // given
      const itemId = '1';
      const quantity = 5;
      const stock = 10;

      // when
      inventoryRepositoryMock.findByItemId.mockResolvedValueOnce({
        itemId,
        stock,
      });
      inventoryRepositoryMock.decreaseByItemId.mockResolvedValueOnce({
        itemId,
        stock: stock - quantity,
      });
      const result = await inventoryService.decreaseByItemId(itemId, quantity);

      // then
      expect(result).not.toBeNull();
      expect(result).toBeTruthy();
      expect(inventoryRepositoryMock.findByItemId).toHaveBeenCalledTimes(1);
      expect(inventoryRepositoryMock.decreaseByItemId).toHaveBeenCalledTimes(1);
    });
  });
});
