import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
// Not null assertion operator -->!
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  buscar() {

    // document.querySelector('input').value = '';
    const valor = this.txtBuscar.nativeElement.value;
    if(valor.trim().length === 0)return

    this.gifsService.buscarGifs(valor)

    this.txtBuscar.nativeElement.value = '';
  }

}
