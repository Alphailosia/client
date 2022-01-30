import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matiere } from '../model/matiere.model';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  url = 'https://angular-intense-app.herokuapp.com/api/matieres';
  //'http://localhost:8010/api/matieres' url à utiliser pour le test en local;

  constructor(private httpClient:HttpClient) { }

  getMatiere(id: number):Observable<Matiere>{
    return this.httpClient.get<Matiere>(this.url+"/"+id);
  }

  getMatieres():Observable<Matiere[]>{
    return this.httpClient.get<Matiere[]>(this.url);
  }

}
