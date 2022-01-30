import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { SnackBarComponent } from 'src/app/shared/snack-bar.component';
import { Assignment } from '../../model/assignment.model'

interface Etu{
  value:number;
  viewValue:string;
}

interface Mat{
  value:number;
  viewValue:string;
}
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  ajoutDesactive = true;
  nomDevoir = "";
  dateDeRendu!: Date; // associé au champ date
  students: Etu[] = [
    {value:1,viewValue:'Désiré Stéphane'},
    {value:2,viewValue:'Mercuri Sabrina'},
    {value:3,viewValue:'Delachambre Johanna'},
    {value:4,viewValue:'Meyer Nicolas'},
    {value:5,viewValue:'Maugard Samuel'},
    {value:6,viewValue:'Bydon Sacha'},
    {value:7,viewValue:'Duvois Allan'}
  ];
  etudiant!: number;
  matieres: Mat[] = [
    {value:1,viewValue:'Base de données'},
    {value:2,viewValue:'Développement Web'},
    {value:3,viewValue:'Développement logiciel'},
    {value:4,viewValue:'Management de projet'}
  ];
  matiere!: number;

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private assignmentService:AssignmentsService,
    private router:Router) { }

  ngOnInit(): void {
  }

  // ajout dans la base de données de l'assignment
  onSubmit() {
    const assignmentNouveau = new Assignment();
    assignmentNouveau.id = Math.round(Math.random()*100000000)
    assignmentNouveau.nom = this.nomDevoir;
    assignmentNouveau.dateDeRendu = this.dateDeRendu;
    assignmentNouveau.rendu = false;
    assignmentNouveau.matiere = this.matiere;
    assignmentNouveau.etudiant = this.etudiant;
    assignmentNouveau.note = NaN;
    assignmentNouveau.remarque = "";

    this.assignmentService.addAssignment(assignmentNouveau).subscribe(message => {
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000,
        data:'Assignment ajouté'
      })
      this.router.navigate(['/home'])
    })
  }

  deconnexion(){
    this.authService.logOut();
    this.router.navigate(['']);
  }
}
