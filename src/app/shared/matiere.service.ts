import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matiere } from './matiere.model';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  url = 'http://localhost:8010/api/matieres'//'https://angular-intense-app.herokuapp.com/api/matieres';

  constructor(private httpClient:HttpClient) { }

  getMatiere(id: number):Observable<Matiere>{
    console.log(id)
    return this.httpClient.get<Matiere>(this.url+"/"+id);
  }

}
