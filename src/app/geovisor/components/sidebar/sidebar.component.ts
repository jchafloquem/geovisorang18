import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LeyendComponent } from './components/leyend/leyend.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    NgClass,
    MatButtonModule,
    LeyendComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public subMenu:
    | 'leyendas'
    | 'capas'
    | 'busqueda'
    | 'streetview'
    | 'imprimir'
    | 'config'
    | 'login'
    | 'logout' = 'capas';

  public toogleMenu = false;

  clickToogleMenu(
    filtro?:
      | 'leyendas'
      | 'capas'
      | 'busqueda'
      | 'streetview'
      | 'imprimir'
      | 'config'
      | 'login'
      | 'logout'
  ): void {
    if (filtro == undefined) {
      this.toogleMenu = !this.toogleMenu;
    } else {
      if (this.subMenu == filtro) {
        this.subMenu = filtro;
        this.toogleMenu = !this.toogleMenu;
      } else {
        this.subMenu = filtro;
        this.toogleMenu = true;
      }
    }
  }
}
