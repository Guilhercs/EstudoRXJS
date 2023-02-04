import { LivroService } from './../../services/livro.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  listaLivros: [];
  search: string = '';
  constructor(private booksService: LivroService) {}

  getBooks() {
    this.booksService.getBooks(this.search).subscribe({
      next: listaLivros => this.listaLivros = listaLivros.items,
    }
  )}
}
