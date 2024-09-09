import { Component, inject } from '@angular/core';
import { GeoViewMapService } from '../../../services/geoViewMap.service';

@Component({
  selector: 'app-info-coordenadas',
  standalone: true,
  imports: [],
  templateUrl: './info-coordenadas.component.html',
  styleUrl: './info-coordenadas.component.scss'
})
export class InfoCoordenadasComponent {
  public _geoviewmap2d = inject(GeoViewMapService);
  constructor() {}
}
