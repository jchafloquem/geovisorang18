import { ElementRef, Injectable } from '@angular/core';

//*librerias de ArcGIS 4.30.9
import AreaMeasurement2D from '@arcgis/core/widgets/AreaMeasurement2D.js';
import DistanceMeasurement2D from '@arcgis/core/widgets/DistanceMeasurement2D.js';
import Expand from '@arcgis/core/widgets/Expand.js';
import Fullscreen from '@arcgis/core/widgets/Fullscreen.js';
import Home from '@arcgis/core/widgets/Home.js';
import LayerList from '@arcgis/core/widgets/LayerList.js';
import Locate from '@arcgis/core/widgets/Locate.js';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Zoom from '@arcgis/core/widgets/Zoom.js';

//*Servicio de Limites Politicos
import { LimPoliticosService } from './layerPoliticos/departamento.service';
import { mtcService } from './layers/mtc.service';
import { AnaService } from './layers/ana.service';
import { MininterService } from './layers/mininter.service';

@Injectable({
  providedIn: 'root',
})
export class GeoViewMapService {
  public map = new Map({basemap: 'topo-vector'});
  private viewMap: MapView | null = null;

  constructor(
    private limiteDepart: LimPoliticosService,
    private ignlim: mtcService,
    private anaRios: AnaService,
    private mininterPolicia: MininterService,
  ) {}

  inicializarMapa(container: ElementRef): Promise<MapView> {

    const viewMap = new MapView({
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

    //*Widget Home
    let home = new Home({ view: viewMap, icon: 'globe' });
    viewMap.ui.add(home, { position: 'top-right' });
    //*Widget Zoom
    let zoom = new Zoom({ view: viewMap });
    viewMap.ui.add(zoom, { position: 'top-right' });
    //*Widget FullScreen
    let fullScreen = new Fullscreen({ view: viewMap, icon: 'monitor' });
    viewMap.ui.add(fullScreen, { position: 'top-right' });
    //*Widget Locate
    let locate = new Locate({ view: viewMap });
    viewMap.ui.add(locate, { position: 'top-right' });
    //*Widget Area
    let area = new AreaMeasurement2D({ view: viewMap });
    const expandArea = new Expand({
      view: viewMap,
      content: area,
      expandIcon: 'freehand-area',
      expandTooltip: 'Medir Area',
    });
    viewMap.ui.add(expandArea, { position: 'top-right' });
    //*Widget Distancia
    let distancia = new DistanceMeasurement2D({
      view: viewMap,
    });
    const expandDistancia = new Expand({
      view: viewMap,
      content: distancia,
      expandIcon: 'walking-distance',
      expandTooltip: 'Medir Distancia',
    });
    viewMap.ui.add(expandDistancia, { position: 'top-right' });

    // const LayerLista = new LayerList({
    //   dragEnabled: true,
    //   minDragEnabledItems: 15,
    //   collapsed: true,
    //   visibilityAppearance: 'checkbox',
    //   view: viewMap,
    // });
    //viewMap.ui.add(LayerLista);
    return viewMap.when(() => {
      //*Adicionamiento de layers WMS y REST
      const ubipolicial = this.mininterPolicia.getMininterPolicia();
      this.map.add(ubipolicial);
      const mtcVias = this.ignlim.getIgnLimites();
      this.map?.add(mtcVias);
      const anaRios = this.anaRios.getAnaRios();
      this.map?.add(anaRios);
      const limiDepart = this.limiteDepart.getLimiteDepartamento();
      this.map?.add(limiDepart);
    });
  }//*

  getMapView(): MapView | null {
    return this.viewMap;
  }
  getdestroyMapView(): void {
    if (this.viewMap) {
      this.viewMap.destroy();
    }
  }
}
