import { Injectable } from '@angular/core';
import { User } from '../app.module';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor() { }

  public get getCurrentUser(): User {
    const currUserId = localStorage.getItem('currentUserId') ? JSON.parse(localStorage.getItem('currentUserId')) : null;
    return this.getUsers(Number(currUserId)) as User;
  }

  public getUsers(userId?: number): User | User[] {
    const users: User[] = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    return userId ? users.find(user => user.id === userId) : users;
  }

  public logOut(): void {
    localStorage.setItem('currentUserId', null);
  }
  public login(username: string): string {
    const users: User[] = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    let user: User = users.find(us => us.user === username);
    const msg = user ? 'Bienvenido '.concat(user.user) : 'Usuario creado correctamente';
    if (!user) {
      user = {
        id: users.length + 1,
        user: username,
        goals: []
      };
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    }
    localStorage.setItem('currentUserId', String(user.id));
    return msg;
  }
}
