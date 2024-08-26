import { Component, inject } from '@angular/core';
import Basemap from '@arcgis/core/Basemap';
import { GeoViewMapService } from '../../../services/geoViewMap.service';

@Component({
  selector: 'app-fab-container-bottom',
  standalone: true,
  imports: [],
  templateUrl: './fab-container-bottom.component.html',
  styleUrl: './fab-container-bottom.component.scss',
})
export class FabContainerBottomComponent {
  public _geovisorService = inject(GeoViewMapService);
  public mapaBaseView = true;
  mapabase(base: string): void {
     this._geovisorService.map.basemap = Basemap.fromId(base);
  }
}
