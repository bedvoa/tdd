export interface IInventoryRepository {
  findByItemId(itemId: string): Promise<any>;
  addInventory(itemId: string, stock: number): Promise<any>;
}
