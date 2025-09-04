import { Injectable } from '@angular/core';
import { IStorageRepository } from '@repositories/storage-repository';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService implements IStorageRepository {

  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): Observable<T | null> {
    const item = sessionStorage.getItem(key);
    return of(item ? JSON.parse(item) : null);
  }

  deleteItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clearAll(): void {
    sessionStorage.clear();
  }
}
