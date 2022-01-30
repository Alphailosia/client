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
import { SnackBarComponent } from 'src/app/shared/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    private etudiantService:EtudiantService,
    private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.getAssignment()
  }

  // l'assignment est marqué comme rendu
  onAssignmentRendu(){
    this.assignmentTransmis!.rendu = true;
    this.assignmentService.updateAssignment(this.assignmentTransmis!).subscribe(message => {
      this.router.navigate(['/home'])
    })
  }

  // ouverture de la dialog pour la supression de l'assignment
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
          this._snackBar.openFromComponent(SnackBarComponent, {
            duration: 3000,
            data:'Assignement supprimé'
          })
        }
        else{
          this._snackBar.openFromComponent(SnackBarComponent, {
            duration: 3000,
            data:'Mot de passe incorrect'
          })
        }
      });
    });
  }

  // ouverture de la dialog pour l'édition de l'assignment
  openEditDialog() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog,{
      width: '30%',
      data:{admin:this.passwordAdmin}
    })

    dialogRef.afterClosed().subscribe(adminPassword => {
      this.authService.checkAdmin(adminPassword).subscribe(result => {
        if(result.admin){
          this.authService.isAdmin();
          this.onClickEdit();
        }
        else{
          this._snackBar.openFromComponent(SnackBarComponent, {
            duration: 3000,
            data:'Mot de passe incorrect'
          })
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
    this.router.navigate(['/assignment/'+this.assignmentTransmis?.id+'/edit'])
  }

  getAssignment(){
    const id = +this.route.snapshot.params['ind'];
    this.assignmentService.getAssignment(id).subscribe( assignment => {
      this.assignmentTransmis=assignment;
      this.matiereService.getMatiere(this.assignmentTransmis!.matiere).subscribe( data => {
        this.matiere = data;
      });
      this.etudiantService.getEtudiant(this.assignmentTransmis!.etudiant).subscribe( data => {
        this.etudiant = data;
      });
    })
  }

  deconnexion(){
    this.authService.logOut();
    this.router.navigate(['']);
  }

}

// component de la fenêtre de dialog pour rentrer le mot de passe administrateur
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
