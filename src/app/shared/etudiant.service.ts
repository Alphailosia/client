import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from '../model/etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  url = 'https://angular-intense-app.herokuapp.com/api/etudiants'
  //'http://localhost:8010/api/etudiants' url à utiliser pour le test en local;

  constructor(private httpClient:HttpClient) { }

  getEtudiant(id: number):Observable<Etudiant>{
    return this.httpClient.get<Etudiant>(this.url+"/"+id);
  }

  getEtudiants():Observable<Etudiant[]>{
    return this.httpClient.get<Etudiant[]>(this.url);
  }

}
