import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from '../model/assignment.model'
import { Router } from '@angular/router';
import { Matiere } from '../model/matiere.model';
import { Etudiant } from '../model/etudiant.model';
import { MatiereService } from '../shared/matiere.service';
import { EtudiantService } from '../shared/etudiant.service';

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
  nomAssignment: string='';


  constructor(
    private router:Router,
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
    console.log(this.assignmentSelectione)
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
    return this.matieres.find(n => n.id === element.matiere)!.nom
  }

  getNomEtudiant(element:any){
    return this.etudiants.find(n => n.id === element.etudiant)!.nom+" "+this.etudiants.find(n => n.id === element.etudiant)!.prenom
  }

  getAssignments(){
      this.assignmentService.getAssignmentsPagine(this.page, this.limit, this.estRendu, this.nomAssignment).subscribe(data => {
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
}
