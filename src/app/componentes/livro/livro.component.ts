import { Livro } from './../../models/interfaces';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css'],
})
export class LivroComponent {
  @Input() livro: Livro;
  modalAberto: boolean;
  bookName: any;

  onModalChange(evento: boolean) {
    this.modalAberto = evento;
  }
}
