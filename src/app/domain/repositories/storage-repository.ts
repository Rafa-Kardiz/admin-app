export interface IStorageRepository {
   setItem(key: string, value: any): void;
   getItem(key: string): any;
   deleteItem(key: string): void;
   clearAll(): void;
}
