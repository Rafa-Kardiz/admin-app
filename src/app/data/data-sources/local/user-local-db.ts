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
    return openDB<MyDB>('pruebaTecnica', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('users')) {
          const store = db.createObjectStore('users', { keyPath: 'uuid' });
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

  async getById(uuid: string): Promise<Usermodel | undefined> {
    const db = await this.dbPromise;
    return db.get('users', uuid);
  }

  async delete(uuid: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('users', uuid);
  }
}
