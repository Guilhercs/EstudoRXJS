import { Item, LivrosResultado } from './../../models/interfaces';
import { LivroService } from './../../services/livro.service';
import { Component } from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  filter,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { VolumeInfo } from 'src/app/models/volumeInfo';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  search = new FormControl();
  msgError = '';
  livrosResultado: LivrosResultado;

  constructor(private booksService: LivroService) {}
  totalDeLivros$ = this.search.valueChanges.pipe(
    debounceTime(300),
    filter((value) => value.length >= 3),
    distinctUntilChanged(),
    switchMap((value) => this.booksService.getBooks(value)),
    map(result => this.livrosResultado = result),
    catchError(erro => {
      console.log(erro)
      return of()
    })
  );

  livrosEncontrados$ = this.search.valueChanges.pipe(
    debounceTime(300),
    filter((value) => value.length >= 3),
    distinctUntilChanged(),
    switchMap((value) => this.booksService.getBooks(value)),
    map((res) => res.items ?? []),
    map((items) => this.booksResults(items)),
    catchError(() => {
      throwError(
        () =>
          new Error(
            (this.msgError =
              'Ops, ocorreu um erro. Por favor, recarregue a aplicação')
          )
      );
      return EMPTY;
    })
  );

  booksResults(items: Item[]): VolumeInfo[] {
    return items.map((item) => {
      return new VolumeInfo(item);
    });
  }
}
