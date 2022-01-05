/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Goal, User } from '../app.module';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class Response {
  message: string;
  result: boolean;
}
export class GoalsService {

  private userService: UserService = new UserService();
  constructor() { }

  public saveGoal(goal: Goal): Observable<Response> {
    const user = this.userService.getCurrentUser;
    const users = this.userService.getUsers() as User[];
    const result = this.validateGoal(goal, false);
    if (result.result && user.id) {
      const goalIndex = user.goals.findIndex(item => item.id === goal.id);
      if (!goal.id) {
        goal.id = user.goals.length + 1;
      }
      goalIndex >= 0 ? user.goals.splice(goalIndex, 1, goal) : user.goals.push(goal);
      const userIndex = users.findIndex(item => item.id === user.id);
      users.splice(userIndex, 1, user);
      localStorage.setItem('users', JSON.stringify(users));
    } else if (!user.id) {
      result.result = false;
      result.message = 'Debe ingresar con un usuario para crear una meta.';
    }
    return of(result).pipe(take(1));
  }

  public deleteGoal(id: number): Observable<Response> {
    const user = this.userService.getCurrentUser;
    const users = this.userService.getUsers() as User[];
    const result: Response = {result: true, message: 'Se ha borrado con éxito la meta.'};
    if (user.id) {
      const goalIndex = user.goals.findIndex(item => item.id === id);
      user.goals.splice(goalIndex, 1);
      const userIndex = users.findIndex(item => item.id === user.id);
      users.splice(userIndex, 1, user);
      localStorage.setItem('users', JSON.stringify(users));
    } else{
      result.result = false;
      result.message = 'Debe ingresar con un usuario para borrar una meta.';
    }
    return of(result).pipe(take(1));
  }

  public validateGoal(goal: Goal, edit: boolean): Response {
    let [res, msg] = [true, 'Se ha guardado con éxito la meta.'];

    goal.rules.forEach(rule => {
      if (rule.amount <= 0 || goal.amount <= 0) {
        res = false;
        msg = 'El monto de la meta y las reglas debe ser mayor a $0';
      }
      if (goal.rules.filter(item => item.teamId === rule.teamId && item.event === rule.event).length > 1) {
        res = false;
        msg = 'Una meta no puede tener dos reglas creadas con los mismos equipos y el mismo evento.';
      }
    });

    return { message: msg, result: res };
  }

  public getGoals(goalId?: number): Goal | Goal[] {
    const user = this.userService.getCurrentUser;
    return goalId ? user.goals.find(goal => goal.id === goalId) : user.goals;
  }
}
