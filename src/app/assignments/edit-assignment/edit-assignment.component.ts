import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
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

  constructor(private route:ActivatedRoute,
              private router:Router,
              private assignmentService:AssignmentsService) { }

  ngOnInit(): void {
    // recup query params

    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment)
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
    this.assignmentService.updateAssignment(this.assignment).subscribe((message) =>{
      console.log(message);

      // navigation vers la home page
      this.router.navigate(['/home']);
    });
  }


  getAssignment(){
    const id = +this.route.snapshot.params['ind'];
    this.assignmentService.getAssignment(id).subscribe( assignment => {
      this.assignment=assignment;
      this.nomAssignment = assignment?.nom;
      this.dateDeRendu=assignment?.dateDeRendu
    })
  }

}
