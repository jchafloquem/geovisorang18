import { Injectable } from '@angular/core';

import WMSLayer from '@arcgis/core/layers/WMSLayer.js';

@Injectable({
  providedIn: 'root',
})
export class mtcService {
  constructor() {}

  layer = new WMSLayer({
    title:'Vias Fuente: MTC',
    url: 'https://www.idep.gob.pe/geoportal/services/SERVICIOS_IGN/TRANSPORTES_Y_COMUNICACIONES_500K/MapServer/WMSServer?',
    visible: false,
  });
  getIgnLimites(): WMSLayer {
    return this.layer;
  }
}
