import {CommonModule, NgClass} from '@angular/common';
import { Component } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, NgClass, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  public subMenu: 'leyendas' | 'capas' | 'filtros' |'config'|'login'= 'capas';

  public toogleMenu = false;

  clickToogleMenu(filtro?: 'leyendas' | 'capas' | 'filtros' |'config'| 'login'): void {
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
