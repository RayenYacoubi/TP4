import { Component, signal, WritableSignal, computed, effect } from '@angular/core';
import { Item } from '../item';

@Component({
  imports: [],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})

export class Cart {

  items : WritableSignal<Item[]> = signal<Item[]>([
  { id: 11, photo: 'lait.jpg', name: 'Lait', price: 1.35, quantity: 2 },
  { id: 12, photo: 'pate.jpg', name: 'Pâtes', price: 0.41, quantity: 1 },
  { id: 13, photo: 'riz.jpg', name: 'Riz', price: 3.8, quantity: 1 },
  { id: 14, photo: 'yaourt.jpg', name:'Yaourt', price: 0.6, quantity:6 }]);

  totalItems = computed(() => {
    return this.items().reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  });

  totalPrice = computed(() => {
    return this.items().reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  });

  remise = computed(() => {
    if (this.totalPrice() > 100) {
      return this.totalPrice() * 0.02 ;
    }

    return 0;
  });

  finalPrice = computed(() => {
    return this.totalPrice() - this.remise();
  });

  constructor() {
    effect(() => {
      console.log(this.items());
    });
  }

  updateQuantity(item: Item, value: number) {
    this.items.update(items => {

      let newItems = items.map(i => {
        if (i.id === item.id) {
          return {
            ...i,
            quantity: i.quantity + value
          };
        }

        return i;
      });

      return newItems.filter(i => i.quantity > 0);
    });
  }

  addItem() {
    this.items.update(items => [
      ...items,
      {
        id: items.length > 0
          ? Math.max(...items.map(i => i.id)) + 1
          : 1,
        photo: 'eau.jpg',
        name: 'eau',
        price: 0.7,
        quantity: 1
      }
    ]);
  }

  deleteItem(name: string) {
    this.items.update(items =>
      items.filter(item => item.name !== name)
    );
  }
}
