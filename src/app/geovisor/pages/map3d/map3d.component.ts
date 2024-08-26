import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

//*librerias de ArcGIS 4.30.9
import { GeoViewMap3dService } from '../../../services/geoViewMap3d.service';

@Component({
  selector: 'app-map3d',
  standalone: true,
  imports: [],
  templateUrl: './map3d.component.html',
  styleUrl: './map3d.component.scss',
})
export default class Map3dComponent implements OnInit, OnDestroy {
  @ViewChild('mapView3d', { static: true }) private mapView3dEl!: ElementRef;

  public _geovisorService3d = inject(GeoViewMap3dService);

  ngOnInit(): void {
    this._geovisorService3d
      .inicializarMapa(this.mapView3dEl)
      .then(() => {
        console.log('Mapa Cargado 3D.... feliz');
      })
      .catch((err) => {
        console.log('Error al cargar el mapa', err);
      });
  }
  ngOnDestroy(): void {
    this._geovisorService3d.getdestroyMapView3d();
  }
}
