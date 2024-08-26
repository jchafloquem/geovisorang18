import { ElementRef, Injectable } from '@angular/core';

import Map from '@arcgis/core/Map';
import SceneView from '@arcgis/core/views/SceneView';

@Injectable({
  providedIn: 'root',
})
export class GeoViewMap3dService {
  public map = new Map({ basemap: 'navigation-3d', ground: 'world-elevation' });
  private viewMap3d: SceneView | null = null;
  constructor() {}
  inicializarMapa(container: ElementRef): Promise<SceneView> {
    const viewMap3d = new SceneView({
      container: container.nativeElement,
      map: this.map,
      zoom: 6,
      center: [-76.015152, -9.189967],
      constraints: {
        //maxZoom: 23,
        //minZoom: 5,
        //snapToZoom: false,
      },
      padding: { top: 0 },
      ui: { components: [] },
    });
    return viewMap3d.when(() => {});
  }
  getdestroyMapView3d(): void {
    if (this.viewMap3d) {
      this.viewMap3d.destroy();
    }
  }
}
