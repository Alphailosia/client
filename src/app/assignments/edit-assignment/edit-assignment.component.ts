import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from 'src/app/model/etudiant.model';
import { Matiere } from 'src/app/model/matiere.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { EtudiantService } from 'src/app/shared/etudiant.service';
import { MatiereService } from 'src/app/shared/matiere.service';
import { SnackBarComponent } from 'src/app/shared/snack-bar.component';
import { Assignment } from '../../model/assignment.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {

    assignment?:Assignment;
    nomAssignment?:string;
    dateDeRendu?:Date;
    note?:string;
    remarque?:string;
    matiere?:Matiere;
    etudiant?:Etudiant;


  constructor(private route:ActivatedRoute,
              private router:Router,
              private matiereService:MatiereService,
              private etudiantService:EtudiantService,
              private authService:AuthService,
              private _snackBar: MatSnackBar,
              private assignmentService:AssignmentsService) { }

  ngOnInit(): void {
    // recup query params
    this.getAssignment();
  }

  onSaveAssignment() {
    if (!this.assignment) return;

    if (this.nomAssignment) {
      this.assignment.nom = this.nomAssignment;
    }

    if (this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }

    if (this.note) {
      this.assignment.note = Number(this.note);
    }

    if (this.remarque) {
      this.assignment.remarque = this.remarque;
    }
    this.assignmentService.updateAssignment(this.assignment).subscribe((message) =>{
      console.log(message);

      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000,
        data:'Assignment modifié'
      })
      // navigation vers la home page
      this.router.navigate(['/home']);
    });
  }


  getAssignment(){
    const id = +this.route.snapshot.params['ind'];
    this.assignmentService.getAssignment(id).subscribe( assignment => {
      this.assignment=assignment;
      this.nomAssignment = assignment?.nom;
      this.dateDeRendu=assignment?.dateDeRendu;
      if(assignment?.note == null) {
        this.note='';
      }
      else {
        this.note= assignment.note+'';
      }
      this.remarque=assignment?.remarque;
      this.matiereService.getMatiere(this.assignment!.matiere).subscribe( data => {
        this.matiere = data;
      });
      this.etudiantService.getEtudiant(this.assignment!.etudiant).subscribe( data => {
        this.etudiant = data;
      });
    })
  }

  deconnexion(){
    this.authService.logOut();
    this.router.navigate(['']);
  }

}
