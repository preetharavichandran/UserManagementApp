import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserCreateEditComponent } from './user-create-edit/user-create-edit.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from './Services/user.service';
import { CommonService } from './Common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{ //implements OnInit{
  // title = 'UserManagementApp';
  // displayedColumns: string[] = [
  //   'id',
  //   'firstName',
  //   'lastName',
  //   'dob',
  //   'action'
  // ];

  // dataSource!: MatTableDataSource<any>;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, 
              private _userService: UserService,
              private _commonService: CommonService,
              private _router: Router){}
  
}
