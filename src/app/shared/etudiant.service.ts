import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from '../model/etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  url = 'http://localhost:8010/api/etudiants'//'https://angular-intense-app.herokuapp.com/api/etudiant';

  constructor(private httpClient:HttpClient) { }

  getEtudiant(id: number):Observable<Etudiant>{
    return this.httpClient.get<Etudiant>(this.url+"/"+id);
  }

  getEtudiants():Observable<Etudiant[]>{
    return this.httpClient.get<Etudiant[]>(this.url);
  }

}
