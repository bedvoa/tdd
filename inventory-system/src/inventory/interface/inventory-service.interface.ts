export interface IInventoryService {
  findByItemId(itemId: string): Promise<any>;
}
