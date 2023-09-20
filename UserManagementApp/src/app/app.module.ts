import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { LoginComponent } from './login/login.component'
import { UserCreateEditComponent } from './user-create-edit/user-create-edit.component'

import { AuthInterceptor } from './Services/auth.interceptor';
import { CommonModule } from '@angular/common';


import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule} from "@angular/material/dialog"
import { MatFormFieldModule} from "@angular/material/form-field"
import { MatDatepickerModule} from "@angular/material/datepicker"
import { MatNativeDateModule} from "@angular/material/core";
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from './Services/auth.service';
import { authGuard } from './auth.guard';
import { UserService } from './Services/user.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    UserCreateEditComponent,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCardModule,
    UserManagementComponent,
    LoginComponent,
    CommonModule,
    FlexModule
  ],
  providers: [
    AuthService,
    UserService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000,
      verticalPosition: 'top', horizontalPosition: 'center',}},
    {provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
