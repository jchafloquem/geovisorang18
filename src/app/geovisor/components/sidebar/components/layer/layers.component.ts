import { Component, inject, OnInit, signal } from '@angular/core';
import { GeoViewMapService } from '../../../../../services/geoViewMap.service';

//*Libreria de material
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggle} from '@angular/material/slide-toggle';




@Component({
  selector: 'app-layers',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './layers.component.html',
  styleUrl: './layers.component.scss'
})
export class LayersComponent implements OnInit {

  public _geovisorService = inject(GeoViewMapService);
  public readonly panelOpenState = signal(false);


  ngOnInit(): void {

  }

}
