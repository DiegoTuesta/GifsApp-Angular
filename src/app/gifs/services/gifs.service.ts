import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsReponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {

  private apiKey: string ="qfXccLlRe5sRkiw71adMfMAszXtH9AVk";
  private servicioUrl: string ="https://api.giphy.com/v1/gifs";
  private _historial: string[] = [];

  //Cambiar any por su resultado
  public resultados: Gif[]=[];

  get historial(): string[] {
    return [...this._historial];
  }

  constructor(private http : HttpClient ) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!)||[];
  }

  buscarGifs(data: string) {
   
    data = data.trim().toLocaleLowerCase();
    if (!this._historial.includes(data)) {
      this._historial.unshift(data);
      this._historial = this._historial.slice(0,10);

      //guardar en el localstorage
      localStorage.setItem('historial',JSON.stringify(this._historial));
    }

    const params = new HttpParams().
    set("api_key" , this.apiKey)
    .set("q", data)
    .set("limit","10");
    this.http.get<SearchGifsReponse>(`${this.servicioUrl}/search`, {params})
    .subscribe((response) =>{
      //console.log(response.data);
      this.resultados = response.data;
      localStorage.setItem('resultados',JSON.stringify(this.resultados));
    });
    
  }
}
