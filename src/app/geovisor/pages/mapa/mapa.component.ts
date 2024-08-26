import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
//*librerias de ArcGIS 4.30.9
import { GeoViewMapService } from '../../../services/geoViewMap.service';
import { FabContainerBottomComponent } from '../../components/fab-container-bottom/fab-container-bottom.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [SidebarComponent, FabContainerBottomComponent],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss',
})
export default class MapaComponent implements OnInit, OnDestroy {
  @ViewChild('mapView', { static: true }) private mapViewEl!: ElementRef;

  public _geovisorService = inject(GeoViewMapService);

  ngOnInit(): void {
    this._geovisorService
      .inicializarMapa(this.mapViewEl)
      .then(() => {
        console.log('Mapa Cargado.... feliz');
      })
      .catch((err) => {
        console.log('Error al cargar el mapa', err);
      });
  }
  ngOnDestroy(): void {
    this._geovisorService.getdestroyMapView();
  }
}
