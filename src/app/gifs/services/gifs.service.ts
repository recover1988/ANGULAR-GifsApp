import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root' // se eleva a un servicio global
})

export class GifsService {
  private apiKey: string = 'dWbtzvoxXfl6EOBk4Nsnc74t7AQXzrcO';
  private _historial: string[] = [];

  public resultados: Gif[] = []

  get historial() {
    // this._historial = this._historial.splice(0, 10)
    return [...this._historial];
  }

  // injectamos el HttpClient que es un observable
  constructor(private http: HttpClient) { }

  buscarGifs(query: string) {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10)

    }
    
    this.http.get<SearchGifsResponse>(`http://api.giphy.com/v1/gifs/search?api_key=dWbtzvoxXfl6EOBk4Nsnc74t7AQXzrcO&q=${query}&limit=10&lang=en`)
      .subscribe((resp) => {
        console.log(resp.data)
        this.resultados = resp.data;
      })


  }

}

    // fetch('http://api.giphy.com/v1/gifs/search?api_key=dWbtzvoxXfl6EOBk4Nsnc74t7AQXzrcO&q=dragon ball z&limit=10')
    //   .then(resp => {
    //     resp.json().then(data => console.log(data))
    //   })

    // const resp = await fetch('http://api.giphy.com/v1/gifs/search?api_key=dWbtzvoxXfl6EOBk4Nsnc74t7AQXzrcO&q=dragon ball z&limit=10')
    // const data = await resp.json();
    // console.log(data)