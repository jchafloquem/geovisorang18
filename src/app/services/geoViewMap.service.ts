import { ElementRef, Injectable } from '@angular/core';

//librerias de ArcGIS 4.30.9

import AreaMeasurement2D from '@arcgis/core/widgets/AreaMeasurement2D.js';
import DistanceMeasurement2D from '@arcgis/core/widgets/DistanceMeasurement2D.js';
import Expand from '@arcgis/core/widgets/Expand.js';
import Fullscreen from "@arcgis/core/widgets/Fullscreen.js";
import Home from '@arcgis/core/widgets/Home.js';
import Locate from '@arcgis/core/widgets/Locate.js';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Zoom from '@arcgis/core/widgets/Zoom.js';

//*Servicio de Limites Politicos
import { LimPoliticosService } from './layerPoliticos/departamento.service';

@Injectable({
  providedIn: 'root',
})
export class GeoViewMapService {
  private map: Map | null = null;
  private viewMap: MapView | null = null;
  constructor(private limiteDepart: LimPoliticosService) {}
  inicializarMapa(container: ElementRef): Promise<MapView> {
    this.map = new Map({ basemap: 'satellite' });
    this.viewMap = new MapView({
      container: container.nativeElement,
      map: this.map,
      zoom: 6,
      center: [-76.015152, -9.189967],
      constraints: {
        maxZoom: 23,
        minZoom: 5,
        snapToZoom: false,
      },
      padding: { top: 0 },
      ui: { components: [] },
    });

    let home = new Home({ view: this.viewMap, icon: 'globe' });
    this.viewMap.ui.add(home, { position: 'top-right' });

    let zoom = new Zoom({ view: this.viewMap });
    this.viewMap.ui.add(zoom, { position: 'top-right' });

    let fullScreen = new Fullscreen({view:this.viewMap, icon:'monitor'});
    this.viewMap.ui.add(fullScreen,{position:'top-right'})
    
    let locate = new Locate({ view: this.viewMap});
    this.viewMap.ui.add(locate, { position: 'top-right' });

    let area = new AreaMeasurement2D({ view: this.viewMap });
    const expandArea = new Expand({
      view: this.viewMap,
      content: area,
      expandIcon:'freehand-area',
      expandTooltip:'Medir Area'
    });this.viewMap.ui.add(expandArea, { position: 'top-right' });

    let distancia = new DistanceMeasurement2D({
      view: this.viewMap,
    });
    const expandDistancia = new Expand({
      view: this.viewMap,
      content: distancia,
      expandIcon: 'walking-distance',
      expandTooltip: 'Medir Distancia',
    });this.viewMap.ui.add(expandDistancia, { position: 'top-right' });

    return this.viewMap.when(() => {
      const limiDepart = this.limiteDepart.getLimiteDepartamento();
      this.map?.add(limiDepart);
    });
  }

  getMapView(): MapView | null {
    return this.viewMap;
  }

  getdestroyMapView(): void {
    if (this.viewMap) {
      this.viewMap.destroy();
    }
  }
}
