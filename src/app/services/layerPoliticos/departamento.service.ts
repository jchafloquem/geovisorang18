import { Injectable } from '@angular/core';

import Color from '@arcgis/core/Color';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js';
import LabelClass from '@arcgis/core/layers/support/LabelClass.js';
import PopupTemplate from '@arcgis/core/PopupTemplate.js';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol.js';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer.js';

@Injectable({
  providedIn: 'root',
})
export class LimPoliticosService {
  private limDepartamento: FeatureLayer;
  constructor() {
    const fillSymbol = new SimpleFillSymbol({
      color: new Color([0, 0, 0, 0]),
      style:'solid', // Color rojo con 50% de opacidad
      outline: {
        color: new Color([0, 0, 0, 1]),
        width: 2,
        style:'solid',
      },
    });
    const renderer = new SimpleRenderer({
      symbol: fillSymbol,
    });
    const popup = new PopupTemplate({
      title: 'Código de ubigeo: ({CODDEP})',
      content: 'Departamento de {NOMBDEP}'
    });
    const labelClass = new LabelClass({
      labelExpressionInfo: { expression: '$feature.NOMBDEP' },
              labelPlacement: 'always-horizontal',
              minScale: 0,
              maxScale: 0,
              symbol: {
                        color: 'black',
                        font: {
                          size: 10,
                          family: 'Arial Unicode MS',
                          weight: 'bold',
                        },
                        haloColor: 'white',
                        haloSize: '1',
                        type: 'text',
              },
    });

    this.limDepartamento = new FeatureLayer({
      title: 'Departamento',
      url: 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/Limites_Censales/MapServer/0',
      labelingInfo: [labelClass],
      visible: true,
      outFields: ['*'],
      popupTemplate: popup,
      renderer: renderer,


    });
  }
  getLimiteDepartamento(): FeatureLayer {
    return this.limDepartamento;
  }
}
