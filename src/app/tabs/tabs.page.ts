import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Goal } from '../app.module';
import { AlertService } from '../services/alert.service';
import { GoalsService } from '../services/goals.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private userService: UserService, private alertService: AlertService,
    private router: Router, private goalsService: GoalsService) {}

  public get hasGoals(): boolean {
    return (this.goalsService.getGoals() as Goal[]).length > 0;
  }

  /**
   * logout
   */
  public logout() {
    this.alertService.confirm('Cerrar Sesión', '¿Está seguro que desea abandonar la sesión?', this.logOutHandle, this);
  }

  /**
   * goToCreate
   */
   public goToCreate(): void {
     console.log(this.router);
    if (this.router.url !== '/tabs/crear-meta') {
      this.router.navigate(['tabs/crear-meta'], undefined);
    }
  }
  /**
   * logOutHandle
   */
  public logOutHandle(context: any, args?: any) {
    context.userService.logOut();
    context.router.navigate(['login']);
  }

}
