import { Injectable } from '@angular/core';
import { Assignment } from '../model/assignment.model';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { bdInitialAssignments } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  url = 'https://angular-intense-app.herokuapp.com/api/assignments'
  //'http://localhost:8010/api/assignments' url à utiliser pour le test en local;

  constructor(private httpClient:HttpClient) { }

  getAssignments():Observable<Assignment[]>{
    return this.httpClient.get<Assignment[]>(this.url);
  }

  addAssignment(assignment: Assignment): Observable<string> {
    return  this.httpClient.post<string>(this.url,assignment)
  }

  updateAssignment(assignment:Assignment):Observable<string>{
    return this.httpClient.put<string>(this.url,assignment);
  }

  onDelete(assignment:Assignment):Observable<any>{
    return this.httpClient.delete<string>(this.url+'/'+assignment._id);
  }

  getAssignment(id:number):Observable<Assignment>{
    return this.httpClient.get<Assignment>(this.url+'/'+id);
  }

  peuplerBD(){
    bdInitialAssignments.forEach( assignment => {
      var a = new Assignment();
      a.nom = assignment.nom;
      a.id = assignment.id;
      a.dateDeRendu = new Date(assignment.dateDeRendu);
      a.rendu = assignment.rendu;
      a.note = assignment.note || NaN;
      a.remarque = assignment.remarque;
      a.matiere = assignment.matiere;
      a.etudiant = assignment.etudiant;
      this.addAssignment(a).subscribe(reponse =>{
        console.log(reponse)
      })
    })
  }

  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment:any = [];

    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      nouvelAssignment.note = a.note || NaN;
      nouvelAssignment.remarque = a.remarque;
      nouvelAssignment.matiere = a.matiere;
      nouvelAssignment.etudiant = nouvelAssignment.etudiant;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  }

  getAssignmentsPagine(page:number,limit:number,estRendu:string, nomAssignment:string, matiere:number, etudiant:number):Observable<any>{
    switch(estRendu){
      case 'rendu':{
        if(matiere==0 && etudiant==0){
          return this.httpClient.get<any>(this.url,{params:{'page':page,'limit':limit,'estRendu':true,'nomAssignment':nomAssignment,'matiere':'undefined','etudiant':'undefined'}});
        }
        else if(matiere==0 && etudiant!=0){
          return this.httpClient.get<any>(this.url,{params:{'page':page,'limit':limit,'estRendu':true,'nomAssignment':nomAssignment,'matiere':'undefined','etudiant':etudiant}});
        }
        else if(matiere!=0 && etudiant==0){
          return this.httpClient.get<any>(this.url,{params:{'page':page,'limit':limit,'estRendu':true,'nomAssignment':nomAssignment,'matiere':matiere,'etudiant':'undefined'}});
        }
        else{
          return this.httpClient.get<any>(this.url,{params:{'page':page,'limit':limit,'estRendu':true,'nomAssignment':nomAssignment,'matiere':matiere,'etudiant':etudiant}});
        }
      }
      case 'nonRendu':{
        if(matiere==0 && etudiant==0){
          return this.httpClient.get<any>(this.url,{params:{'page':page,'limit':limit,'estRendu':false,'nomAssignment':nomAssignment,'matiere':'undefined','etudiant':'undefined'}});
        }
        else if(matiere==0 && etudiant!=0){
          return this.httpClient.get<any>(this.url,{params:{'page':page,'limit':limit,'estRendu':false,'nomAssignment':nomAssignment,'matiere':'undefined','etudiant':etudiant}});
        }
        else if(matiere!=0 && etudiant==0){
          return this.httpClient.get<any>(this.url,{params:{'page':page,'limit':limit,'estRendu':false,'nomAssignment':nomAssignment,'matiere':matiere,'etudiant':'undefined'}});
        }
        else{
          return this.httpClient.get<any>(this.url,{params:{'page':page,'limit':limit,'estRendu':false,'nomAssignment':nomAssignment,'matiere':matiere,'etudiant':etudiant}});
        }
      }
      default:{
        if(matiere==0 && etudiant==0){
          return this.httpClient.get<any>(this.url,{params:{'page':page,'limit':limit,'nomAssignment':nomAssignment,'matiere':'undefined','etudiant':'undefined'}});
        }
        else if(matiere==0 && etudiant!=0){
          return this.httpClient.get<any>(this.url,{params:{'page':page,'limit':limit,'nomAssignment':nomAssignment,'matiere':'undefined','etudiant':etudiant}});
        }
        else if(matiere!=0 && etudiant==0){
          return this.httpClient.get<any>(this.url,{params:{'page':page,'limit':limit,'nomAssignment':nomAssignment,'matiere':matiere,'etudiant':'undefined'}});
        }
        else{
          return this.httpClient.get<any>(this.url,{params:{'page':page,'limit':limit,'nomAssignment':nomAssignment,'matiere':matiere,'etudiant':etudiant}});
        }
      }
    }
  }

}
