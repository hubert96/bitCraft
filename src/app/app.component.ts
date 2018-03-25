import { Component } from '@angular/core';
import { HttpService } from './http.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  public user: User;
  public userRegister: UserRegister;
  actualUserName: string;
  actualUserData;
  allUsersData;
  userStatus = 'login';
  loginMessage: string;

  constructor(private httpService: HttpService) {
    this.user = new User();
    this.userRegister = new UserRegister();
    this.printAllUsers();
  }

  setAuthType(status) {
    this.userStatus = status;
  }

  signIn() {
    if(this.userRegister.name && this.userRegister.username && this.userRegister.password){
     this.httpService.registerRequest(this.userRegister).subscribe( result => {
       console.log(result);
       if(result.status === 200) {
         this.user.username = this.userRegister.username;
         this.user.password = this.userRegister.password;
         this.logIn()
       } else {
         this.loginMessage = 'Cant create account';
       }
     })
    } else {
      alert('Provide correctly all inputs')
    }
  }

  logIn() {
    if (this.user.username && this.user.password) {
      this.httpService.logInRequest(this.user).subscribe(result => {
        if (result.status === 'success') {
          this.userStatus = 'logged';
          this.actualUserName = result.data[0].name;
          this.loginMessage = 'You have successfully logged in!';
          this.actualUserData = result.data[0];
          console.log(result.data[0]) ;
        } else {
          this.loginMessage = 'Login and password are incorrect!';
        }
      }, error => {
        this.loginMessage = 'Connection error!';
      });
    } else {
      alert('Please provide user name and password!');
    }
  }

  logOut() {
    this.userStatus = 'login';
    this.actualUserName = '';
    this.loginMessage = 'You have been logged out';
  }

  printAllUsers() {
    this.httpService.getAllUsers().subscribe(result => {
      console.log(result.data);
      this.allUsersData = result.data;
    });
  }
}


export class User {
  constructor() {
    this.username = '';
    this.password = '';
  }
  public username;
  public password;
}

export class UserRegister {
  constructor() {
    this.name = '';
    this.username = '';
    this.password = '';
  }
  public name;
  public username;
  public password;
}

export interface Data {
  username;
  password;
  name;
  skills: [
    {
      skill;
      level;
    }
  ];
}

