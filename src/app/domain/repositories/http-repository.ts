import { UserLoginModel } from "@models/usermodel";
import { Observable } from "rxjs";

export interface IHttpRepository {
   httpGet<T>(url: string): Observable<T>;
   httpPost<T>(url: string, body: any): Observable<T>;
   httpPut<T>(url: string, body: any): Observable<T>;
   httpDelete<T>(url: string, id: number): Observable<T>;
}
