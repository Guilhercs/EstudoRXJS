import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  constructor(private http: HttpClient) { }
  getBooks(value: string): Observable<any>{
    const params = new HttpParams().append('q', value)
    return this.http.get('https://www.googleapis.com/books/v1/volumes', {params})
  }
}
