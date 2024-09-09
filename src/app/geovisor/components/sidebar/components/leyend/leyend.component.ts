import { Component, inject, OnInit } from '@angular/core';
import { GeoViewMapService } from '../../../../../services/geoViewMap.service';



@Component({
  selector: 'app-leyend',
  standalone: true,
  imports: [],
  templateUrl: './leyend.component.html',
  styleUrl: './leyend.component.scss'
})
export class LeyendComponent implements OnInit {
  public _geoViewMapService = inject(GeoViewMapService);
  public leyenda!: any;

  ngOnInit(): void {
    this.crearLeyenda();
  }

  crearLeyenda(): void {
    setTimeout( () => {
      //this.leyenda = this._geoViewMapService.leyenda;
      if (this.leyenda) {
        const leyendaContainer = document.getElementById('legend-container');
        leyendaContainer?.appendChild(this.leyenda.container);
      }
    }, 100);
  }

}
