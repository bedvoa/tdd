export interface IInventoryRepository {
  findByItemId(itemId: string): Promise<any>;
  addInventory(itemId: string, stock: number): Promise<any>;
  decreaseByItemId(itemId: string, quantity: number): Promise<any>;
}
