import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

  assignmentTransmis?:Assignment;

  constructor(private assignmentService:AssignmentsService,
    private route:ActivatedRoute,
    private router:Router,
    private authService:AuthService) { }

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
    })
  }

  isAdmin(){
    return !this.authService.auth;
  }
}
