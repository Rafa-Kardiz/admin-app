import { Injectable } from '@angular/core';
import { Usermodel } from '@models/usermodel';
import { openDB, DBSchema, IDBPDatabase } from 'idb';


interface MyDB extends DBSchema {
  users: {
    key: string;
    value: Usermodel;
    indexes: { 'by-email': string };
  };
}


@Injectable({
  providedIn: 'root'
})
export class UserLocalDbService {
  private dbPromise!: Promise<IDBPDatabase<MyDB>>;

  constructor() {
    this.dbPromise = this.initDB();
  }

  private async initDB() {
    return openDB<MyDB>('MyAppDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('users')) {
          const store = db.createObjectStore('users', { keyPath: 'id' });
          store.createIndex('by-email', 'email');
        }
      },
    });
  }

  async save(user: Usermodel) {
    const db = await this.dbPromise;
    await db.put('users', user);
  }

  async getAll(): Promise<Usermodel[]> {
    const db = await this.dbPromise;
    return db.getAll('users');
  }

  async getById(id: string): Promise<Usermodel | undefined> {
    const db = await this.dbPromise;
    return db.get('users', id);
  }

  async delete(id: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('users', id);
  }
}
