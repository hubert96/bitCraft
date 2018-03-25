import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User, UserRegister} from './app.component';


@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get('/api/users');
  }

  logInRequest(user: User) {
    return this.http.post('/api/user/login', {
      username : user.username,
      password : user.password
    });
  }

  registerRequest(user: UserRegister) {
    return this.http.post('/api/user/add', {
      name : user.name,
      username : user.username,
      password : user.password
    });
  }

  deleteSkill() {
    return this.http.get('/api/user/deleteSkill');
  }
}
