import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from '../model/assignment.model'

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Gestion des assignments';
  assignmentSelectione?:Assignment;
  assignments:Assignment[] = [];
  page: number=1;
  limit: number=10;
  totalDocs?: number;
  totalPages?: number;
  hasPrevPage?: boolean;
  prevPage?: number;
  hasNextPage?: boolean;
  nextPage?: number;
  estRendu: string='tous';


  constructor(private assignmentService:AssignmentsService) {}

  ngOnInit(): void {
    this.getAssignments();
  }

  getColor(a: any) {
     return a.rendu ? 'green' : 'red';
  }

  assignmentClique(assignment:any){
    this.assignmentSelectione=assignment;
    console.log(this.assignmentSelectione)
  }

  getAssignments(){
      this.assignmentService.getAssignmentsPagine(this.page, this.limit, this.estRendu).subscribe(data => {
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
    this.page=pe.pageIndex
    this.limit=pe.pageSize
    this.getAssignments()
  }
}
