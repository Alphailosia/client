import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Matiere } from 'src/app/model/matiere.model';
import { MatiereService } from 'src/app/shared/matiere.service';
import { Assignment } from '../../model/assignment.model';
import { EtudiantService } from 'src/app/shared/etudiant.service';
import { Etudiant } from 'src/app/model/etudiant.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


interface DialogData {
  admin: string
}
@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

  assignmentTransmis?:Assignment;
  matiere?:Matiere;
  etudiant?:Etudiant;
  public passwordAdmin?:string;

  constructor(private assignmentService:AssignmentsService,
    private route:ActivatedRoute,
    private router:Router,
    private authService:AuthService,
    public dialog: MatDialog,
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

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog,{
      width: '30%',
      data:{admin:this.passwordAdmin}
    })

    dialogRef.afterClosed().subscribe(adminPassword => {
      console.log(adminPassword)
      this.authService.checkAdmin(adminPassword).subscribe(result => {
        if(result.admin){
          console.log('mot de passe correct ... supression de l\'assignment');
          this.onDelete();
        }
        else{
          console.log('mot de passe incorrect');
        }
      });
    });
  }

  onDelete(){
    this.assignmentService.onDelete(this.assignmentTransmis!).subscribe(reponse => {
      console.log(reponse.message);
      this.assignmentTransmis=undefined
      this.router.navigate(['/home'])
    })
  }

  onClickEdit(){
    this.router.navigate(['/assignment/'+this.assignmentTransmis?.id+'/edit'],
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

  deconnexion(){
    this.authService.logOut();
    this.router.navigate(['']);
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-delete-template.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
