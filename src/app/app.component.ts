import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Application de gestion des devoirs à rendre (Assignments)";

  constructor(private authService:AuthService,
              private assignmentService:AssignmentsService,
              private router:Router){}

  login(){
    if(this.authService.loggedIn){
      this.authService.logOut();
      this.router.navigate(['/home']);
    }
    else{
      this.authService.logIn();
    }
  }

  peupler(){
    this.assignmentService.peuplerBD();
  }

  peupler2(){
    this.assignmentService.peuplerBDAvecForkJoin().subscribe(()=>{
      console.log('base init')
      this.router.navigate(['/home'],{replaceUrl:true})
    });
  }
}
