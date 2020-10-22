import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from "../models/user";

import { environment } from "../../environments/environment";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: String, password: String){
    console.log(environment.apiUrl);
    return this.http.post<any>(`${environment.apiUrl}/users/authencticate`, {username, password})
    .pipe( map (user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }));

  }
}
