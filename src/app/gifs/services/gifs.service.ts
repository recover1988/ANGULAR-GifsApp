import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root' // se eleva a un servicio global
})

export class GifsService {
  private apiKey: string = 'dWbtzvoxXfl6EOBk4Nsnc74t7AQXzrcO';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    // this._historial = this._historial.splice(0, 10)
    return [...this._historial];
  }

  // injectamos el HttpClient que es un observable
  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }

  }

  buscarGifs(query: string) {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10)

      // usar localstorage - JSON.stringify lo cambia a string
      localStorage.setItem('historial', JSON.stringify(this._historial));


    }

    this.http.get<SearchGifsResponse>(`http://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10&lang=en`)
      .subscribe((resp) => {
        console.log(resp.data)
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
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