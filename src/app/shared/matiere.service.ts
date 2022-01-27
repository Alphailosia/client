import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matiere } from '../model/matiere.model';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  url = 'http://localhost:8010/api/matieres'//'https://angular-intense-app.herokuapp.com/api/matieres';

  constructor(private httpClient:HttpClient) { }

  getMatiere(id: number):Observable<Matiere>{
    return this.httpClient.get<Matiere>(this.url+"/"+id);
  }

  getMatieres():Observable<Matiere[]>{
    return this.httpClient.get<Matiere[]>(this.url);
  }

}
