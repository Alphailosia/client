import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from '../model/assignment.model'
import { Router } from '@angular/router';
import { Matiere } from '../model/matiere.model';
import { Etudiant } from '../model/etudiant.model';
import { MatiereService } from '../shared/matiere.service';
import { EtudiantService } from '../shared/etudiant.service';
import { AuthService } from '../shared/auth.service';



interface Type{
  value:string;
  viewValue:string;
}
interface Etu{
  value:number;
  viewValue:string;
}

interface Mat{
  value:number;
  viewValue:string;
}
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Gestion des assignments';
  assignmentSelectione?:Assignment;
  assignments:Assignment[] = [];
  matieres:Matiere[] = [];
  etudiants:Etudiant[] = [];
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu','matiere','etudiant', 'rendu'];
  page: number=1;
  limit: number=10;
  totalDocs?: number;
  totalPages?: number;
  hasPrevPage?: boolean;
  prevPage?: number;
  hasNextPage?: boolean;
  nextPage?: number;
  estRendu: string='tous';
  types: Type[] = [
    {value:'tous',viewValue:'Tous'},
    {value:'rendu',viewValue:'Rendu'},
    {value:'nonRendu',viewValue:'Non rendu'},
  ];
  students: Etu[] = [
    {value:0,viewValue:'Tous les étudiants'},
    {value:1,viewValue:'Désiré Stéphane'},
    {value:2,viewValue:'Mercuri Sabrina'},
    {value:3,viewValue:'Delachambre Johanna'},
    {value:4,viewValue:'Meyer Nicolas'},
    {value:5,viewValue:'Maugard Samuel'},
    {value:6,viewValue:'Bydon Sacha'},
    {value:7,viewValue:'Duvois Allan'}
  ];
  etudiant: number=0;
  matieresTab: Mat[] = [
    {value:0,viewValue:'Toutes les matières'},
    {value:1,viewValue:'Base de données'},
    {value:2,viewValue:'Développement Web'},
    {value:3,viewValue:'Développement logiciel'},
    {value:4,viewValue:'Management de projet'}
  ];
  matiere: number=0;
  nomAssignment: string='';

  constructor(
    private router:Router,
    private authService:AuthService,
    private assignmentService:AssignmentsService,
    private matiereService:MatiereService,
    private etudiantService:EtudiantService) {}

  ngOnInit(): void {
    this.getMatieres();
    this.getEtudiants();
    this.getAssignments();
  }

  getColor(a: any) {
     return a.rendu ? 'green' : 'red';
  }

  assignmentClique(assignment:any){
    this.assignmentSelectione=assignment;
  }

  goToDetail(row:any){
    this.router.navigate([`/assignment/${row.id}`])
  }

  getMatieres(){
    this.matiereService.getMatieres().subscribe(matieres =>{
      this.matieres = matieres
    })
  }

  getEtudiants(){
    this.etudiantService.getEtudiants().subscribe(etudiants =>{
      this.etudiants = etudiants
    })
  }

  getNomMatiere(element:any){
    for(let matiere of this.matieres){
      if(matiere.id==element.matiere){
        return matiere.nom
      }
    }
    return '';
  }

  getNomEtudiant(element:any){
    for(let etudiant of this.etudiants){
      if(etudiant.id==element.matiere){
        return etudiant.nom+' '+etudiant.prenom
      }
    }
    return '';
  }

  getAssignments(){
      this.assignmentService.getAssignmentsPagine(this.page, this.limit, this.estRendu, this.nomAssignment, this.matiere, this.etudiant).subscribe(data => {
      console.log(data)
      this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      console.log("données reçues");
    })
  }

  onChangePage(pe:PageEvent){
    this.page=pe.pageIndex+1
    this.limit=pe.pageSize
    this.getAssignments()
  }

  deconnexion(){
    this.authService.logOut();
    this.router.navigate(['']);
  }
}
