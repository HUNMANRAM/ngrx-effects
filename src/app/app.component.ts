import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { getUsers } from './user.action';
import { FormsModule } from '@angular/forms';
import { selectAllUsers, selectUserByEmail } from './user.selectors';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AsyncPipe,CommonModule,FormsModule],
  templateUrl: './app.component.html',
 // template: `HII
//`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test';
  name:string = '';
  //user$!: Observable<any>;
  users:any[]=[];
  users$!:Observable<any>;
  employeeData:{name:string,email:string,phone:string}={name:'',email:'',phone:''};

  // constructor(private store:Store<any>){

  // }
  //private employeeService = inject(Store);
  store = inject(Store);
  
  ngOnInit(): void {
     this.store.dispatch(getUsers());
     this.store.select('user').subscribe(
      data =>{
        this.users = data.users;
        console.log("HIIII")
        console.log(data)

       // console.log(findUser('Mike')) // { id: 2, name: 'Mike', isActive: false }
  // this.employeeData = this.getemployeeData('Ervin Howell	')
  // console.log( this.employeeData )


      }
     )
  }


   getemployeeData() {
   // this.users$ = this.store.select(selectAllUsers);
    this.users$ = this.store.select(selectUserByEmail(this.name));

    this.users$.subscribe((data)=>{
      this.employeeData =data;
    })


    this.users$.subscribe((users)=>{
      console.log("USEREE USERESSS");
      console.log(users);
    })
    // console.log("THis Name",this.name);
    // for (let user of this.users) {
    //   if (user.name === this.name) { // case sensitive
    //     console.log("HJKL",user);
    //     this.employeeData =user;
    //     return user
    //   }
    // }
    // return null
  }
  
   



}
