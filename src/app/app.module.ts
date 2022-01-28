import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import {MatStepperModule} from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { AssignmentDetailComponent, DialogOverviewExampleDialog } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth-component/auth-component.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

const routes:Routes = [
  {path:'', component:AuthComponent},
  {path:'home', component:AssignmentsComponent,runGuardsAndResolvers: 'always'},
  {path:'add',component:AddAssignmentComponent},
  {path:'assignment/:ind', component:AssignmentDetailComponent},
  {path:'assignment/:ind/edit', component:EditAssignmentComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    AuthComponent,
    DialogOverviewExampleDialog,
  ],
  imports: [
    BrowserModule,MatStepperModule,MatSelectModule,
    BrowserAnimationsModule,MatDialogModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    MatInputModule,MatDatepickerModule,MatNativeDateModule,
    MatListModule,MatCardModule,MatCheckboxModule, MatSlideToggleModule, HttpClientModule, MatPaginatorModule, MatRadioModule,
    FormsModule, MatTableModule, RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
