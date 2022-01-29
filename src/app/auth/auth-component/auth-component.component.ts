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

  connect() {
    this.authService.logIn(this.email, this.password).subscribe(data => {
      if (data.auth) {
        this._snackBar.openFromComponent(SnackBarComponent, {
          duration: 3000,
          data:'connexion réussie'
        })
        this.route.navigate(['/home'])
      }
    },
    error =>{
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000,
        data: error.error
      })
      this.route.navigate([''])
    })
  }

  register() {
    this.authService.register(this.name, this.email, this.password).subscribe(data => {
      if (data.auth) {
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

  change() {
    this.connexion = !this.connexion;
  }

  ngOnInit(): void {
  }

}
