import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserLoginModel } from '@models/usermodel';
import { IHttpRepository } from '@repositories/http-repository';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralApiService implements IHttpRepository {

  private http = inject(HttpClient);

  httpGet<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(() => error);
      })
    );
  }

  httpPost<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(() => error);
      })
    );
  }

  httpPut<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(() => error);
      })
    );
  }

  httpDelete<T>(url: string, id: number): Observable<T> {
    const urlDelete = url + `/${id}`
    return this.http.delete<T>(url).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(() => error);
      })
    );
  }

}
