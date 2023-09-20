import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog"
import { MatFormFieldModule} from "@angular/material/form-field"
import { MatDatepickerModule} from "@angular/material/datepicker"
import { MatNativeDateModule} from "@angular/material/core";
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { CommonService } from '../Common/common.service';

@Component({
  standalone:true,
  selector: 'app-user-create-edit',
  imports: [DatePickerComponent,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    ],
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.css']
})

export class UserCreateEditComponent implements OnInit{
  userInfoForm :FormGroup;

 constructor( 
  private _formBuilder: FormBuilder, 
  private _userService : UserService, 
  private _dialogRef: MatDialogRef<UserCreateEditComponent>,
  private _commonService : CommonService,
  @Inject(MAT_DIALOG_DATA) public data : any
  ){
  this.userInfoForm=this._formBuilder.group({
  firstName:'',
  lastName:'',
  dateOfBirth:'',
  userId:0,
  });
  }
  
  ngOnInit(): void{
    this.userInfoForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.userInfoForm.valid){
      if(this.data){
        console.log(this.data.userId)
        this._userService.updateExistingUser(this.data.userId,this.userInfoForm.value).subscribe({
          next:(val:any) => {
            this._commonService.openSnackBar("User Info Modified Successfully");
            this._dialogRef.close(true);
          },
          error:(errMsg: any) => {
            console.log(errMsg); 
          }
        });
      }
      else{
        console.log(this.userInfoForm.value);
        this._userService.addNewUser(this.userInfoForm.value).subscribe({
          next:(val:any) => {
            this._commonService.openSnackBar("New User Added Successfully");
            this._dialogRef.close(true);
          },
          error:(errMsg: any) => {
            console.log(errMsg); 
          }
        });
      }
    }
    
  }
}
