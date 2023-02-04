import { Livro, Item } from './../../models/interfaces';
import { LivroService } from './../../services/livro.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VolumeInfo } from 'src/app/models/volumeInfo';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  listaLivros!: Livro[];
  search: string = '';
  subscription: Subscription;
  livro: Livro;
  constructor(private booksService: LivroService) {}

  getBooks() {
    this.subscription = this.booksService.getBooks(this.search).subscribe({
      next: (items) => {
        this.listaLivros = this.booksResults(items);
      },
      error: (erro) => console.log(erro),
    });
  }
  booksResults(items: Item[]): VolumeInfo[] {
    return items.map(item => {
      return new VolumeInfo(item)
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
