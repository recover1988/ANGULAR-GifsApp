import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // se eleva a un servicio global
})
export class GifsService {
  private apiKey: string = 'dWbtzvoxXfl6EOBk4Nsnc74t7AQXzrcO';
  private _historial: string[] = [];

  get historial() {
    // this._historial = this._historial.splice(0, 10)
    return [...this._historial];
  }

  buscarGifs(query: string) {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10)

    }


    console.log(this._historial)
  }
  constructor() { }
}
