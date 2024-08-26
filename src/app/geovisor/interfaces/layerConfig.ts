import PopupTemplate from '@arcgis/core/PopupTemplate';
import LabelClass from '@arcgis/core/layers/support/LabelClass.js';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer.js';

export interface LayerConfig {
	title: string;
	url: string;
	popupTemplate?: PopupTemplate;
	labelingInfo?: LabelClass;
	visible: boolean;
	outFields?: string[];
	renderer?: SimpleRenderer;
	maxScale?: number;
	minScale?: number;

	group: string; //* Agrupación de capas
}
