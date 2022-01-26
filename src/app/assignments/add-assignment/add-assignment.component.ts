import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../../model/assignment.model'

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  ajoutDesactive = true;
  nomDevoir = "";
  dateDeRendu!: Date; // associé au champ date

  constructor(private assignmentService:AssignmentsService,
    private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.nomDevoir + " " + this.dateDeRendu)
    const assignmentNouveau = new Assignment();
    assignmentNouveau.id = Math.round(Math.random()*100000)
    assignmentNouveau.nom = this.nomDevoir;
    assignmentNouveau.dateDeRendu = this.dateDeRendu;
    assignmentNouveau.rendu = false;

    this.assignmentService.addAssignment(assignmentNouveau).subscribe(message => {
      console.log(message);
      this.router.navigate(['/home'])
    })
  }
}
