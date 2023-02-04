import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Item, LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private dataBase = 'https://www.googleapis.com/books/v1/volumes';
  constructor(private http: HttpClient) {}

  getBooks(value: string): Observable<Item[]> {
    const params = new HttpParams().append('q', value);
    return this.http
      .get<LivrosResultado>(this.dataBase, { params }).pipe(
        tap(res => console.log(res)),
        map(res => res.items),
        tap(res => console.log(res)
        ));
  }
}
