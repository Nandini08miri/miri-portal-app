import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private httpClient: HttpClient) {}

  public get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient.get(path, { params }).pipe(catchError(this.formatErrors));
  }
  public getDownloadFile(path: string): Observable<any> {
    const httpOptions = {
      responseType:'blob' as 'json'
      };
    return this.httpClient.get(path, httpOptions).pipe(catchError(this.formatErrors));
  }

  public put(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .put( path, JSON.stringify(body), this.options)
      .pipe(catchError(this.formatErrors));
  }

  public post(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .post( path, JSON.stringify(body), this.options)
      .pipe(catchError(this.formatErrors));
  }

  public postformdata(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .post( path, body)
      .pipe(catchError(this.formatErrors));
  }

  public delete(path: string): Observable<any> {
    return this.httpClient.delete( path).pipe(catchError(this.formatErrors));
  }

  public formatErrors(error: any): Observable<any> {
    return throwError(error.error);
  }
}
