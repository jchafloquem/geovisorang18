import { ElementRef, Injectable } from '@angular/core';

//*librerias de ArcGIS 4.30.9
import AreaMeasurement2D from '@arcgis/core/widgets/AreaMeasurement2D.js';
import DistanceMeasurement2D from '@arcgis/core/widgets/DistanceMeasurement2D.js';
import Expand from '@arcgis/core/widgets/Expand.js';
import Fullscreen from '@arcgis/core/widgets/Fullscreen.js';
import Home from '@arcgis/core/widgets/Home.js';
import LayerList from '@arcgis/core/widgets/LayerList.js';
import Locate from '@arcgis/core/widgets/Locate.js';
import * as projection from '@arcgis/core/geometry/projection';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Zoom from '@arcgis/core/widgets/Zoom.js';
import Legend from '@arcgis/core/widgets/Legend.js';
import Point from '@arcgis/core/geometry/Point';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import CoordinateConversion from '@arcgis/core/widgets/CoordinateConversion.js';

//*Servicio de Limites Politicos
import { LimPoliticosService } from './layersPoliticos/departamento.service';
import { AnaService } from './layers/ana.service';
import { GoogleMapsModule } from '@angular/google-maps';

@Injectable({
  providedIn: 'root',
})
export class GeoViewMapService {

  public map = new Map({ basemap: 'topo-vector' });
  private viewMap: MapView | null = null;
//*Variables de la funcion Coordenadas
  public view: any = null;
  public gcsLongitude = '--';
  public gcsLatitude = '--';
  public utmZone = '--';
  public utmEast = '--';
  public utmNorth = '--';
  public scale = '--';
  //public legenda!: Legend;







  constructor(
    private limiteDepart: LimPoliticosService,
    private anaRios: AnaService,

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

    //*Funcion para visualizar la escala del Mapa 1/2
    viewMap.watch('scale', (scale: any) => {
      this.scale = this.formatScale(scale);
    });
    //Funcion de coordenadas
    const ccoordenadas = new CoordinateConversion({
      view: viewMap,
    });
    viewMap.on('pointer-move', (event: { x: any; y: any }) => {
      const point = this.view.toMap({ x: event.x, y: event.y });
      this.updateCoordinates(point.latitude, point.longitude);
    });
    this.view = viewMap;
    //*Fin de la funcion para visualizar la escala del Mapa 1/2



    //*Controles del mapa
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
    const leyenda = new Legend({
      view: viewMap,
      container: document.createElement('div'),
    });

    return viewMap.when(() => {
      //*Adicionamiento de layers WMS y REST
      this.map.add(this.anaRios.getAnaRios());
      this.map.add(this.limiteDepart.getLimiteDepartamento());

    });
  } //* Fin de inicializarMapa

  updateCoordinates(lat: number, lon: number): void {
    this.gcsLongitude = lon.toFixed(5);
    this.gcsLatitude = lat.toFixed(5);
    // Calculate UTM Zone
    const zoneNumber = Math.floor((lon + 180) / 6) + 1;
    const utmBand = this.getUtmBand(lat);
    this.utmZone = `${zoneNumber} ${utmBand}`;
    // Convert to UTM
    const pointUTM = new Point({
      latitude: lat,
      longitude: lon,
      spatialReference: SpatialReference.WGS84,
    });
    const utmWkid = lat >= 0 ? 32600 + zoneNumber : 32700 + zoneNumber; // WKID for UTM zone
    const projected = projection.project(
      pointUTM,
      new SpatialReference({ wkid: utmWkid })
    ) as Point;
    const utmPoint = projected as Point;
    this.utmEast = `${utmPoint.x.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} m`;
    this.utmNorth = `${utmPoint.y.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} m`;
    // Calculate UTM Zone
  }
  getUtmBand(latitude: number): string {
    const bands = 'CDEFGHJKLMNPQRSTUVWX'; // Bands from 80S to 84N
    const index = Math.floor((latitude + 80) / 8);
    return bands.charAt(index);
  }
   //*Funcion para visualizar la escala del Mapa 2/2
   formatScale(scale: number): string {
    return scale.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
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
