import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cart } from './cart/cart';

@Component({
  imports: [RouterOutlet, Cart],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Exercice');
}
