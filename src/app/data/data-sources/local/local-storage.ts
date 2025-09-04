import { Injectable } from '@angular/core';
import { IStorageRepository } from '@repositories/storage-repository';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements IStorageRepository {

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): Observable<T | null> {
    const item = localStorage.getItem(key);
    return of(item ? JSON.parse(item) : null);
  }

  deleteItem(key: string): void {
    localStorage.removeItem(key);
  }

  clearAll(): void {
    localStorage.clear();
  }

}
