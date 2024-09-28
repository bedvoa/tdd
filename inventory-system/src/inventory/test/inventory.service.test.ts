import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from '../inventory.service';
import { Inventory } from '../dto/inventory.dto';
import { InventoryRepository } from '../repository/inventory.repository';

jest.mock('../repository/inventory.repository');

describe('InventoryService', () => {
  let sut: InventoryService; // System Under Test
  let inventoryRepository: InventoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryService, InventoryRepository],
    }).compile();

    sut = module.get<InventoryService>(InventoryService);
    inventoryRepository = module.get<InventoryRepository>(InventoryRepository);
  });

  /** 재고 조회 */
  describe('FindByItemId', () => {
    it('itemId를 갖는 entity를 찾지 못하면, null을 반환', async () => {
      // given
      const nonExistingItemId = '2';

      // when
      const result: Inventory = sut.findByItemId(nonExistingItemId);

      // then
      expect(result).toBeNull();
    });

    it('itemId를 갖는 entity를 찾았다면, inventory를 반환', async () => {
      // given
      const existingItemId: string = '2';
      const quantity: number = 10;

      // when
      const result: Inventory = sut.findByItemId(existingItemId);

      // then
      expect(result).not.toBeNull();
      expect(existingItemId).toBe(result.getItemId());
      expect(quantity).toBe(result.getStock());
    });
  });

  /** 재고 감소 */
  describe('DecreaseByItemId', () => {
    it('quantity가 음수라면, Exception을 throw한다.', async () => {});

    it('itemId를 갖는 entity를 찾지 못하면, Exception을 throw한다.', async () => {});

    it('quantity가 stock보다 크면, Exception을 throw한다.', async () => {});

    it('변경된 entity가 없다면, Exception을 throw한다.', async () => {});

    it('itemId를 갖는 entity를 찾았다면, stock을 차감하고 inventory를 반화', async () => {});
  });

  /** 재고 수정 */
  describe('UpdateStock', () => {
    it('수정할 stock이 음수라면, Exception을 throw한다.', async () => {});

    it('itemId를 갖는 entity를 찾지 못하면, Exception을 throw한다.', async () => {});

    it('itemId를 갖는 entity를 찾았다면, stock을 수정하고 inventory를 반환', async () => {});
  });
});
