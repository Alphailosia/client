import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Matiere } from 'src/app/model/matiere.model';
import { MatiereService } from 'src/app/shared/matiere.service';
import { Assignment } from '../../model/assignment.model';
import { EtudiantService } from 'src/app/shared/etudiant.service';
import { Etudiant } from 'src/app/model/etudiant.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

  assignmentTransmis?:Assignment;
  matiere?:Matiere;
  etudiant?:Etudiant;

  constructor(private assignmentService:AssignmentsService,
    private route:ActivatedRoute,
    private router:Router,
    private authService:AuthService,
    private matiereService:MatiereService,
    private etudiantService:EtudiantService) { }

  ngOnInit(): void {
    this.getAssignment()
  }

  onAssignmentRendu(){
    this.assignmentTransmis!.rendu = true;
    this.assignmentService.updateAssignment(this.assignmentTransmis!).subscribe(message => {
      console.log(message)
      this.router.navigate(['/home'])
    })
  }

  onDelete(){
    this.assignmentService.onDelete(this.assignmentTransmis!).subscribe(reponse => {
      console.log(reponse.message);
      this.assignmentTransmis=undefined
      this.router.navigate(['/home'])
    })
  }

  onClickEdit(){
    this.router.navigate(['/assignment',this.assignmentTransmis?.id,'edit'],
    {queryParams:{name:'desire',prenom:'stephane'}, fragment:'edit'})
  }

  getAssignment(){
    const id = +this.route.snapshot.params['ind'];
    this.assignmentService.getAssignment(id).subscribe( assignment => {
      this.assignmentTransmis=assignment;
      this.matiereService.getMatiere(this.assignmentTransmis!.matiere).subscribe( data => {
        console.log(data)
        this.matiere = data;
      });
      this.etudiantService.getEtudiant(this.assignmentTransmis!.etudiant).subscribe( data => {
        console.log(data)
        this.etudiant = data;
      });
    })
  }

  isAdmin(){
    return !this.authService.auth;
  }

  deconnexion(){
    this.authService.logOut();
    this.router.navigate(['']);
  }

}
