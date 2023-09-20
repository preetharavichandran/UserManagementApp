import { Component, OnInit, ViewChild } from '@angular/core';
import { UserCreateEditComponent } from '../user-create-edit/user-create-edit.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog"
import { MatFormFieldModule} from "@angular/material/form-field"
import { MatDatepickerModule} from "@angular/material/datepicker"
import { MatNativeDateModule} from "@angular/material/core";
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { CommonService } from '../Common/common.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
@Component({
  standalone:true,
  selector: 'app-user-management',
  imports: [
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    UserCreateEditComponent,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    CommonModule
    ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{
  title = 'UserManagementApp';
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'dob',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, 
              private _userService: UserService,
              private _commonService: CommonService,
              private _authService: AuthService,
              private _router: Router){}
  
  ngOnInit(): void {
    this.getUserList();
  }

  logout(){
    this._authService.logout();
  }

  refreshUserInfo( dialogRef: MatDialogRef<UserCreateEditComponent>) {
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserList();
        }
      }
    });
  }

  openCreateUserDialog(){
    const dialogRef = this._dialog.open(UserCreateEditComponent);
    this.refreshUserInfo(dialogRef);
  }

  openEditUserDialog(userInfo: any) {
    const dialogRef = this._dialog.open(UserCreateEditComponent,
      {data :userInfo});

    this.refreshUserInfo(dialogRef);
  }

  getUserList(){
    this._userService.getUserList().subscribe({
      next: (val) => {
        console.log(val);
        this.dataSource = new MatTableDataSource(val);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: (errMsg) => {
        if(errMsg instanceof HttpErrorResponse)
        if(errMsg.status ==401)
          this._router.navigate(['/login']);
        console.log(errMsg);
      }
    });
  }

  deleteUser(id: number){
    if(confirm("Are you sure to delete this user?")){
      this._userService.deleteUser(id).subscribe({
        next : (val) =>{
          this._commonService.openSnackBar('User Deleted','Done');
          this.getUserList();
        }
      });
    }    
  }
}
