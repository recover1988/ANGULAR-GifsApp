import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
// Not null assertion operator -->!
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  buscar() {

    // document.querySelector('input').value = '';
    const valor = this.txtBuscar.nativeElement.value;
    console.log(valor)
    this.txtBuscar.nativeElement.value = '';
  }

}
