import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private _router: Router
  ) { }

  getData(): User {

    const user: User = {
      name: localStorage.getItem('name'),
      id: localStorage.getItem('id'),
      lastName: localStorage.getItem('lastName'),
      area: localStorage.getItem('area'),
      role: localStorage.getItem('role'),
      token: localStorage.getItem('token')
    };
    return user;
  }

  setData( user: User ): void {
    localStorage.setItem('area', user.area );
    localStorage.setItem('role', user.role );
    localStorage.setItem('name', user.name );
    localStorage.setItem('lastName', user.lastName );
    localStorage.setItem('token', user.token );
    localStorage.setItem('id', user.id );
  }

  deleteData(): void {
    localStorage.removeItem('area');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('lastName');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this._router.navigateByUrl('/');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}
