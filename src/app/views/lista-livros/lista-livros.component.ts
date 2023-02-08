import { Item } from './../../models/interfaces';
import { LivroService } from './../../services/livro.service';
import { Component } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, switchMap, throwError } from 'rxjs';
import { VolumeInfo } from 'src/app/models/volumeInfo';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  search = new FormControl();
  msgError = ''

  constructor(private booksService: LivroService) {}

  livrosEncontrados$ = this.search.valueChanges.pipe(
    debounceTime(300),
    filter((value) => value.length >= 3),
    distinctUntilChanged(),
    switchMap((value) => this.booksService.getBooks(value)),
    map((items) => this.booksResults(items)),
    catchError(() => {
      throwError(()=> new Error(this.msgError = 'Ops, ocorreu um erro'))
      return EMPTY
    })
  );

  booksResults(items: Item[]): VolumeInfo[] {
    return items.map((item) => {
      return new VolumeInfo(item);
    });
  }
}
