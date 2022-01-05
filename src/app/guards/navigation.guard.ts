import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Goal } from '../app.module';
import { GoalsService } from '../services/goals.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationGuard implements CanActivate {

  constructor(private goalsService: GoalsService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const shallPass = (this.goalsService.getGoals() as Goal[]).length > 0;
      if (!shallPass) {
        this.router.navigate(['tabs/crear-meta']);
      }
    return shallPass;
  }
}
