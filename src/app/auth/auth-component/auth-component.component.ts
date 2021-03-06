import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/snack-bar.component';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService,
    private _snackBar: MatSnackBar,
    private route: Router) { }

  connexion = false;
  name = "";
  email = "";
  password = "";

  // connexion de l'utilisateur
  connect() {
    this.authService.logIn(this.email, this.password).subscribe(data => {
      console.log(data)
      if (data.auth) {
        this._snackBar.openFromComponent(SnackBarComponent, {
          duration: 3000,
          data:'Connexion réussie'
        })
        this.route.navigate(['/home'])
      }
      else{
        this._snackBar.openFromComponent(SnackBarComponent, {
          duration: 3000,
          data:'Mauvais identifiant'
        })
      }
    },
    error =>{
      console.log(error)
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000,
        data: 'Mauvais identifiant'
      })
      this.route.navigate([''])
    })
  }

  // inscription de l'utilisateur
  register() {
    this.authService.register(this.name, this.email, this.password).subscribe(data => {
      if (data.auth) {
        this._snackBar.openFromComponent(SnackBarComponent, {
          duration: 3000,
          data:'Inscription réussie'
        })
        this.route.navigate(['/home'])
      }
    })
  }

  validate() {
    if (this.connexion) {
      this.register()
    }
    else {
      this.connect()
    }
  }

  // changement entre le mode de connexion et le mode inscription
  change() {
    this.connexion = !this.connexion;
  }

  ngOnInit(): void {
  }

}
