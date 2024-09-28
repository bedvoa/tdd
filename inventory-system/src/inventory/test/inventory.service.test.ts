import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from '../inventory.service';

describe('InventoryService', () => {
  let service: InventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryService],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
  });

  /** 재고 조회 */
  describe('FindByItemId', () => {
    it('itemId를 갖는 entity를 찾지 못하면, null을 반환', async () => {});

    it('itemId를 갖는 entity를 찾았다면, inventory를 반환', async () => {});
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
