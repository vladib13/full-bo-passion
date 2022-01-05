import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Goal } from '../app.module';
import { AlertService } from '../services/alert.service';
import { GoalsService } from '../services/goals.service';

@Component({
  selector: 'app-metas',
  templateUrl: 'metas.page.html',
  styleUrls: ['metas.page.scss']
})
export class MetasPage implements OnInit {

  public goals: Goal[];
  constructor(private goalsService: GoalsService, private router: Router, private alertService: AlertService) {}

  ngOnInit(): void {
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        this.goals = this.goalsService.getGoals() as Goal[];
      }
    });
  }

  /**
   * goToCreate
   */
  public goToCreate(goalId?: number): void {
    this.router.navigate(['tabs/crear-meta'], goalId ? {queryParams: {id: goalId}} : undefined);
  }
  /**
   * formattedDate
   */
   public formattedDate(date: string): string {
    const fDate = new Date(date);
    return String(fDate.getDate()).concat('-', String(fDate.getMonth() + 1), '-', String(fDate.getFullYear()));
  }

  /**
   * deleteGoal
   */
  public deleteGoal(deleteId: number): void {
    this.alertService.confirm('Borrar Meta', '¿Está seguro que desea borrar esta meta?', this.deleteHandle, this, {id: deleteId});
  }

  /**
   * deleteHandle
   */
  public deleteHandle(context: any, args?: any) {
    context.goalsService.deleteGoal(args.id).subscribe(res => {
      context.alertService.notify('Excelente', res.message);
      context.goals = context.goalsService.getGoals() as Goal[];
    });
  }

}
