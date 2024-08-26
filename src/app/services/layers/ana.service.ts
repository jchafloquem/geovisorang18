import { Injectable } from '@angular/core';

import WMSLayer from '@arcgis/core/layers/WMSLayer.js';

@Injectable({
  providedIn: 'root'
})
export class AnaService {
  constructor() { }
  layer = new WMSLayer({
    title:'Rios Fuente: ANA',
    url: 'https://geosnirh.ana.gob.pe/server/services/Público/Rios/MapServer/WMSServer?',
    visible: true,
  });
  getAnaRios(): WMSLayer {
    return this.layer;
  }
}


