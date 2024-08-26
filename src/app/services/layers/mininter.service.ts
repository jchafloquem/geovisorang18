import { Injectable } from '@angular/core';
import WMSLayer from '@arcgis/core/layers/WMSLayer.js';

@Injectable({
  providedIn: 'root'
})
export class MininterService {

  constructor() { }

  layer = new WMSLayer({
    title:'Policia Nacional del Perú Fuente: MININTER',
    url: 'https://seguridadciudadana.mininter.gob.pe/arcgis/services/servicios_ogc/policia_nacional_peru/MapServer/WMSServer?request=GetCapabilities&service=WMS',
    visible: false,
  });
  getMininterPolicia(): WMSLayer {
    return this.layer;
  }
}
