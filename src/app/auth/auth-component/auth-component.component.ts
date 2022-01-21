import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService:AuthService,
              private route:Router) { }

  connexion = false;
  name = "";
  email = "";
  password = "";

  connect(){
    this.authService.logIn(this.email,this.password).subscribe( data => {
      if(data.auth){
        this.route.navigate(['/home'])
      }
    })
  }

  register(){
    this.authService.register(this.name,this.email,this.password).subscribe( data => {
      if(data.auth){
        this.route.navigate(['/home'])
      }
    })
  }

  validate(){
    if(this.connexion){
      this.connect()
    }
    else{
      this.register()
    }
  }

  change(){
    this.connexion = !this.connexion;
  }

  ngOnInit(): void {
  }

}
